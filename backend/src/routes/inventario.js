// =============================================
// src/routes/inventario.js
// GET  /api/inventario              → stock completo (admin)
// GET  /api/inventario/alertas      → productos con stock bajo (admin)
// POST /api/inventario/ajuste       → ajustar stock (admin)
// GET  /api/inventario/movimientos  → historial (admin)
// =============================================
import { Router } from 'express'
import { supabaseAdmin } from '../db/connection.js'
import { soloAdmin } from '../middlewares/auth.js'

const router = Router()

// Stock completo clasificado por categoría
router.get('/', soloAdmin, async (_req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('productos')
      .select('*')
      .order('categoria')
      .order('nombre')

    if (error) throw error

    // Agrupar por categoría
    const porCategoria = data.reduce((acc, p) => {
      if (!acc[p.categoria]) acc[p.categoria] = []
      acc[p.categoria].push(p)
      return acc
    }, {})

    res.json({
      todos: data,
      por_categoria: porCategoria,
      total_productos: data.length,
      stock_bajo: data.filter(p => p.stock <= p.stock_minimo && p.activo).length,
      sin_stock: data.filter(p => p.stock === 0).length,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Solo productos con stock bajo o agotado
router.get('/alertas', soloAdmin, async (_req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('productos')
      .select('*')
      .eq('activo', true)
      .order('stock')

    if (error) throw error

    res.json({
      stock_bajo: data.filter(p => p.stock > 0 && p.stock <= p.stock_minimo),
      sin_stock:  data.filter(p => p.stock === 0),
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Ajustar stock manualmente
router.post('/ajuste', soloAdmin, async (req, res) => {
  try {
    const { producto_id, cantidad, tipo, motivo } = req.body

    if (!producto_id || cantidad === undefined || !tipo) {
      return res.status(400).json({ error: 'producto_id, cantidad y tipo son requeridos' })
    }

    // Obtener stock actual
    const { data: producto, error: errProd } = await supabaseAdmin
      .from('productos')
      .select('stock, nombre')
      .eq('id', producto_id)
      .single()

    if (errProd) return res.status(404).json({ error: 'Producto no encontrado' })

    const stockAnterior = producto.stock
    let stockNuevo

    if (tipo === 'entrada')  stockNuevo = stockAnterior + Number(cantidad)
    else if (tipo === 'salida')  stockNuevo = stockAnterior - Number(cantidad)
    else if (tipo === 'ajuste')  stockNuevo = Number(cantidad)
    else return res.status(400).json({ error: 'tipo debe ser: entrada, salida o ajuste' })

    if (stockNuevo < 0) {
      return res.status(400).json({ error: 'El stock resultante no puede ser negativo' })
    }

    // Actualizar stock
    await supabaseAdmin.from('productos').update({ stock: stockNuevo }).eq('id', producto_id)

    // Registrar movimiento
    await supabaseAdmin.from('movimientos_inventario').insert({
      producto_id,
      tipo,
      cantidad: Number(cantidad),
      stock_anterior: stockAnterior,
      stock_nuevo: stockNuevo,
      motivo: motivo || `Ajuste manual por admin`,
      admin_id: req.admin.id,
    })

    res.json({
      ok: true,
      producto: producto.nombre,
      stock_anterior: stockAnterior,
      stock_nuevo: stockNuevo,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Historial de movimientos
router.get('/movimientos', soloAdmin, async (req, res) => {
  try {
    const { producto_id, limit = 50 } = req.query

    let query = supabaseAdmin
      .from('movimientos_inventario')
      .select(`*, productos(nombre, categoria)`)
      .order('created_at', { ascending: false })
      .limit(Number(limit))

    if (producto_id) query = query.eq('producto_id', producto_id)

    const { data, error } = await query
    if (error) throw error

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
