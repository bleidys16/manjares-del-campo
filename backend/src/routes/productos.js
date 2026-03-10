// =============================================
// src/routes/productos.js
// GET    /api/productos           → todos (público)
// GET    /api/productos/destacados → destacados (público)
// GET    /api/productos/:id        → uno (público)
// POST   /api/productos            → crear (admin)
// PUT    /api/productos/:id        → editar (admin)
// DELETE /api/productos/:id        → eliminar (admin)
// =============================================
import { Router } from 'express'
import { supabaseAdmin } from '../db/connection.js'
import { soloAdmin } from '../middlewares/auth.js'

const router = Router()

// ── Públicos ──────────────────────────────────

// Obtener todos los productos activos
router.get('/', async (req, res) => {
  try {
    const { categoria, buscar } = req.query

    let query = supabaseAdmin
      .from('productos')
      .select('*')
      .eq('activo', true)
      .order('destacado', { ascending: false })
      .order('nombre')

    if (categoria && categoria !== 'todos') {
      query = query.eq('categoria', categoria)
    }

    if (buscar) {
      query = query.or(`nombre.ilike.%${buscar}%,descripcion.ilike.%${buscar}%`)
    }

    const { data, error } = await query
    if (error) throw error

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Productos destacados
router.get('/destacados', async (_req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('productos')
      .select('*')
      .eq('activo', true)
      .eq('destacado', true)
      .order('nombre')

    if (error) throw error
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('productos')
      .select('*')
      .eq('id', req.params.id)
      .eq('activo', true)
      .single()

    if (error) return res.status(404).json({ error: 'Producto no encontrado' })
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ── Solo Admin ────────────────────────────────

// Crear producto
router.post('/', soloAdmin, async (req, res) => {
  try {
    const { nombre, descripcion, categoria, precio, unidad, stock, stock_minimo, imagen_url, destacado, tags } = req.body

    if (!nombre || !categoria || !precio || !unidad) {
      return res.status(400).json({ error: 'nombre, categoria, precio y unidad son requeridos' })
    }

    const { data, error } = await supabaseAdmin
      .from('productos')
      .insert({ nombre, descripcion, categoria, precio, unidad, stock: stock || 0, stock_minimo: stock_minimo || 5, imagen_url, destacado: destacado || false, tags: tags || [] })
      .select()
      .single()

    if (error) throw error
    res.status(201).json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Actualizar producto
router.put('/:id', soloAdmin, async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('productos')
      .update(req.body)
      .eq('id', req.params.id)
      .select()
      .single()

    if (error) throw error
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Eliminar (desactivar) producto
router.delete('/:id', soloAdmin, async (req, res) => {
  try {
    const { error } = await supabaseAdmin
      .from('productos')
      .update({ activo: false })
      .eq('id', req.params.id)

    if (error) throw error
    res.json({ ok: true, mensaje: 'Producto desactivado' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
