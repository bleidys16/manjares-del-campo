// =============================================
// src/routes/configuracion.js
// GET /api/configuracion/tienda       → config pública
// GET /api/configuracion/pagos        → métodos de pago
// GET /api/configuracion/banners      → banners activos
// PUT /api/configuracion/tienda       → actualizar (admin)
// PUT /api/configuracion/pagos/:id    → actualizar pago (admin)
// =============================================
import { Router } from 'express'
import { supabaseAdmin } from '../db/connection.js'
import { soloAdmin } from '../middlewares/auth.js'

const router = Router()

// Config de la tienda (público)
router.get('/tienda', async (_req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('configuracion_tienda')
      .select('clave, valor')

    if (error) throw error

    const config = data.reduce((acc, item) => {
      acc[item.clave] = item.valor
      return acc
    }, {})

    res.json(config)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Métodos de pago activos (público)
router.get('/pagos', async (_req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('configuracion_pagos')
      .select('*')
      .eq('activo', true)

    if (error) throw error
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Banners activos (público)
router.get('/banners', async (_req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('banners')
      .select('*')
      .eq('activo', true)
      .order('orden')

    if (error) throw error
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Actualizar config de tienda (admin)
router.put('/tienda', soloAdmin, async (req, res) => {
  try {
    const updates = req.body // { clave: valor, clave2: valor2 }

    for (const [clave, valor] of Object.entries(updates)) {
      await supabaseAdmin
        .from('configuracion_tienda')
        .upsert({ clave, valor: String(valor) })
    }

    res.json({ ok: true, mensaje: 'Configuración actualizada' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Actualizar método de pago (admin)
router.put('/pagos/:id', soloAdmin, async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('configuracion_pagos')
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

export default router
