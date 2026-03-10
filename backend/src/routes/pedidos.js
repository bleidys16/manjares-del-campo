// =============================================
// src/routes/pedidos.js
// POST /api/pedidos              → crear pedido (público)
// GET  /api/pedidos              → todos (admin)
// GET  /api/pedidos/:id          → uno con detalle (público)
// PUT  /api/pedidos/:id/estado   → actualizar estado (admin)
// GET  /api/pedidos/:id/factura  → generar factura HTML
// =============================================
import { Router } from 'express'
import { supabaseAdmin } from '../db/connection.js'
import { soloAdmin } from '../middlewares/auth.js'
import { generarHtmlFactura, generarMensajeWhatsApp } from '../helpers/plantillas.js'

const router = Router()

// ── Crear pedido (público, no necesita cuenta) ──

router.post('/', async (req, res) => {
  try {
    const { cliente, items, metodo_pago, descuento, notas } = req.body

    if (!cliente || !items?.length || !metodo_pago) {
      return res.status(400).json({ error: 'cliente, items y metodo_pago son requeridos' })
    }

    // 1. Buscar cliente por teléfono o crear uno nuevo
    let clienteId
    const { data: existente } = await supabaseAdmin
      .from('clientes')
      .select('id')
      .eq('telefono', cliente.telefono)
      .maybeSingle()

    if (existente) {
      clienteId = existente.id
      await supabaseAdmin.from('clientes').update({
        nombre: cliente.nombre,
        email: cliente.email,
        direccion: cliente.direccion,
        barrio: cliente.barrio,
        notas: cliente.notas,
      }).eq('id', clienteId)
    } else {
      const { data: nuevo, error: errCliente } = await supabaseAdmin
        .from('clientes')
        .insert(cliente)
        .select('id')
        .single()
      if (errCliente) throw errCliente
      clienteId = nuevo.id
    }

    // 2. Calcular totales
    const subtotal = items.reduce((acc, i) => acc + i.precio_unitario * i.cantidad, 0)
    const total    = subtotal - (descuento || 0)

    // 3. Crear el pedido
    const { data: pedido, error: errPedido } = await supabaseAdmin
      .from('pedidos')
      .insert({ cliente_id: clienteId, subtotal, descuento: descuento || 0, total, metodo_pago, notas })
      .select()
      .single()
    if (errPedido) throw errPedido

    // 4. Insertar detalle
    const detalles = items.map(i => ({
      pedido_id:      pedido.id,
      producto_id:    i.producto_id,
      cantidad:       i.cantidad,
      precio_unitario: i.precio_unitario,
      subtotal:       i.precio_unitario * i.cantidad,
    }))
    const { error: errDetalle } = await supabaseAdmin.from('detalle_pedidos').insert(detalles)
    if (errDetalle) throw errDetalle

    // 5. Devolver pedido con link de WhatsApp
    const pedidoCompleto = await getPedidoCompleto(pedido.id)
    const { data: config } = await supabaseAdmin.from('configuracion_tienda').select('clave, valor')
    const configObj = config?.reduce((a, c) => ({ ...a, [c.clave]: c.valor }), {})

    res.status(201).json({
      pedido: pedidoCompleto,
      whatsapp_url: generarMensajeWhatsApp(pedidoCompleto, configObj),
    })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ── Ver un pedido por ID (para confirmación) ──

router.get('/:id', async (req, res) => {
  try {
    const pedido = await getPedidoCompleto(req.params.id)
    if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' })
    res.json(pedido)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ── Generar factura HTML ──

router.get('/:id/factura', async (req, res) => {
  try {
    const pedido = await getPedidoCompleto(req.params.id)
    if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' })

    await supabaseAdmin.from('pedidos').update({ factura_generada: true }).eq('id', pedido.id)

    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.send(generarHtmlFactura(pedido))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ── Solo Admin ────────────────────────────────

// Listar todos los pedidos con filtros
router.get('/', soloAdmin, async (req, res) => {
  try {
    const { estado, fecha_inicio, fecha_fin, limit = 20, offset = 0 } = req.query

    let query = supabaseAdmin
      .from('pedidos')
      .select(`*, clientes(nombre, telefono, barrio), detalle_pedidos(cantidad, precio_unitario)`, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(Number(offset), Number(offset) + Number(limit) - 1)

    if (estado)       query = query.eq('estado', estado)
    if (fecha_inicio) query = query.gte('created_at', fecha_inicio)
    if (fecha_fin)    query = query.lte('created_at', fecha_fin)

    const { data, error, count } = await query
    if (error) throw error

    res.json({ data, total: count })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Actualizar estado del pedido
router.put('/:id/estado', soloAdmin, async (req, res) => {
  try {
    const { estado, estado_pago } = req.body
    const update = {}
    if (estado)      update.estado      = estado
    if (estado_pago) update.estado_pago = estado_pago

    const { data, error } = await supabaseAdmin
      .from('pedidos')
      .update(update)
      .eq('id', req.params.id)
      .select()
      .single()

    if (error) throw error
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ── Helper interno ──

async function getPedidoCompleto(id) {
  const { data, error } = await supabaseAdmin
    .from('pedidos')
    .select(`*, clientes(*), detalle_pedidos(*, productos(nombre, imagen_url, unidad))`)
    .eq('id', id)
    .single()

  if (error) return null
  return data
}

export default router
