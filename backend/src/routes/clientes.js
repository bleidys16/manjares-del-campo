// =============================================
// src/routes/clientes.js
// GET /api/clientes        → listar (admin)
// GET /api/clientes/:id    → ver uno (admin)
// GET /api/clientes/:id/pedidos → historial (admin)
// =============================================
import { Router } from 'express'
import { supabaseAdmin } from '../db/connection.js'
import { soloAdmin } from '../middlewares/auth.js'

const router = Router()

// Listar todos los clientes
router.get('/', soloAdmin, async (req, res) => {
  try {
    const { buscar, limit = 50, offset = 0 } = req.query

    let query = supabaseAdmin
      .from('clientes')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(Number(offset), Number(offset) + Number(limit) - 1)

    if (buscar) {
      query = query.or(`nombre.ilike.%${buscar}%,telefono.ilike.%${buscar}%`)
    }

    const { data, error, count } = await query
    if (error) throw error

    res.json({ data, total: count })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Ver un cliente
router.get('/:id', soloAdmin, async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('clientes')
      .select('*')
      .eq('id', req.params.id)
      .single()

    if (error) return res.status(404).json({ error: 'Cliente no encontrado' })
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Historial de pedidos de un cliente
router.get('/:id/pedidos', soloAdmin, async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('pedidos')
      .select(`*, detalle_pedidos(*, productos(nombre, unidad))`)
      .eq('cliente_id', req.params.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
