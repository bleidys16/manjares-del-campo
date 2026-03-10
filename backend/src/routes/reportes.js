// =============================================
// src/routes/reportes.js
// GET /api/reportes/dashboard        → stats del mes (admin)
// GET /api/reportes/ventas-mensuales → últimos N meses (admin)
// GET /api/reportes/productos-top    → más vendidos (admin)
// GET /api/reportes/mensual          → reporte completo HTML/JSON (admin)
// =============================================
import { Router } from 'express'
import { supabaseAdmin } from '../db/connection.js'
import { soloAdmin } from '../middlewares/auth.js'
import { generarHtmlReporte } from '../helpers/plantillas.js'

const router = Router()

// Dashboard — estadísticas del mes actual
router.get('/dashboard', soloAdmin, async (_req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('vista_dashboard')
      .select('*')
      .single()

    if (error) throw error
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Ventas de los últimos N meses
router.get('/ventas-mensuales', soloAdmin, async (req, res) => {
  try {
    const meses = Number(req.query.meses) || 6
    const fechaLimite = new Date()
    fechaLimite.setMonth(fechaLimite.getMonth() - meses)

    const { data, error } = await supabaseAdmin
      .from('vista_ventas_mensuales')
      .select('*')
      .gte('mes', fechaLimite.toISOString())
      .order('mes', { ascending: true })

    if (error) throw error
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Productos más vendidos
router.get('/productos-top', soloAdmin, async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10

    const { data, error } = await supabaseAdmin
      .from('vista_productos_top')
      .select('*')
      .limit(limit)

    if (error) throw error
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Reporte mensual completo (JSON o HTML imprimible)
router.get('/mensual', soloAdmin, async (req, res) => {
  try {
    const mesNum = req.query.mes  ? parseInt(req.query.mes)  : new Date().getMonth() + 1
    const añoNum = req.query.año  ? parseInt(req.query.año)  : new Date().getFullYear()

    const fechaInicio = new Date(añoNum, mesNum - 1, 1).toISOString()
    const fechaFin    = new Date(añoNum, mesNum, 0, 23, 59, 59).toISOString()

    const { data: pedidos, error } = await supabaseAdmin
      .from('pedidos')
      .select(`
        *,
        clientes(nombre, telefono, barrio),
        detalle_pedidos(cantidad, precio_unitario, subtotal, productos(nombre, categoria))
      `)
      .gte('created_at', fechaInicio)
      .lte('created_at', fechaFin)
      .neq('estado', 'cancelado')

    if (error) throw error

    const totalPedidos    = pedidos?.length || 0
    const ingresosTotales = pedidos?.reduce((a, p) => a + p.total, 0) || 0
    const ticketPromedio  = totalPedidos > 0 ? ingresosTotales / totalPedidos : 0

    const pedidosPorEstado = pedidos?.reduce((a, p) => {
      a[p.estado] = (a[p.estado] || 0) + 1; return a
    }, {})

    const productosMes = {}
    pedidos?.forEach(p => {
      p.detalle_pedidos?.forEach(i => {
        const n = i.productos.nombre
        if (!productosMes[n]) productosMes[n] = { nombre: n, categoria: i.productos.categoria, cantidad: 0, ingresos: 0 }
        productosMes[n].cantidad += i.cantidad
        productosMes[n].ingresos += i.subtotal
      })
    })

    const ingresosPorMetodo = pedidos?.reduce((a, p) => {
      a[p.metodo_pago] = (a[p.metodo_pago] || 0) + p.total; return a
    }, {})

    const pedidosPorBarrio = pedidos?.reduce((a, p) => {
      const b = p.clientes?.barrio || 'Sin especificar'
      a[b] = (a[b] || 0) + 1; return a
    }, {})

    const reporte = {
      periodo: {
        mes: mesNum, año: añoNum,
        nombre: new Date(añoNum, mesNum - 1).toLocaleString('es-CO', { month: 'long', year: 'numeric' }),
      },
      resumen: {
        total_pedidos:      totalPedidos,
        ingresos_totales:   ingresosTotales,
        ticket_promedio:    Math.round(ticketPromedio),
        pedidos_entregados: pedidosPorEstado?.entregado || 0,
        tasa_completados:   totalPedidos > 0
          ? Math.round(((pedidosPorEstado?.entregado || 0) / totalPedidos) * 100) : 0,
      },
      pedidos_por_estado:       pedidosPorEstado,
      productos_top:            Object.values(productosMes).sort((a, b) => b.ingresos - a.ingresos).slice(0, 10),
      ingresos_por_metodo_pago: ingresosPorMetodo,
      pedidos_por_barrio:       pedidosPorBarrio,
      generado_en:              new Date().toISOString(),
    }

    if (req.query.formato === 'html') {
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      return res.send(generarHtmlReporte(reporte))
    }

    res.json(reporte)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
