// =============================================
// src/routes/auth.js
// POST /api/auth/login
// POST /api/auth/logout
// GET  /api/auth/me
// =============================================
import { Router } from 'express'
import { supabaseAdmin } from '../db/connection.js'
import { soloAdmin } from '../middlewares/auth.js'

const router = Router()

// LOGIN admin
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña requeridos' })
    }

    const { data, error } = await supabaseAdmin.auth.signInWithPassword({ email, password })
    if (error) return res.status(401).json({ error: 'Credenciales incorrectas' })

    // Verificar que sea admin
    const { data: admin, error: errAdmin } = await supabaseAdmin
      .from('admins')
      .select('id, nombre, email')
      .eq('auth_id', data.user.id)
      .eq('activo', true)
      .single()

    if (errAdmin || !admin) {
      return res.status(403).json({ error: 'No tienes permisos de administrador' })
    }

    res.json({
      token: data.session.access_token,
      admin,
    })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// LOGOUT
router.post('/logout', soloAdmin, async (_req, res) => {
  res.json({ ok: true, mensaje: 'Sesión cerrada' })
})

// VER PERFIL ADMIN
router.get('/me', soloAdmin, (req, res) => {
  res.json({ admin: req.admin })
})

export default router
