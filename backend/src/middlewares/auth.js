// =============================================
// src/middleware/auth.js — Proteger rutas admin
// =============================================
import { supabaseAdmin } from '../db/connection.js'

export async function soloAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token requerido' })
    }

    const token = authHeader.split(' ')[1]

    // Verificar token con Supabase
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)
    if (error || !user) {
      return res.status(401).json({ error: 'Token inválido o expirado' })
    }

    // Verificar que sea admin en la tabla admins
    const { data: admin, error: errAdmin } = await supabaseAdmin
      .from('admins')
      .select('id, nombre, email')
      .eq('auth_id', user.id)
      .eq('activo', true)
      .single()

    if (errAdmin || !admin) {
      return res.status(403).json({ error: 'No tienes permisos de administrador' })
    }

    // Adjuntar usuario al request
    req.user = user
    req.admin = admin
    next()

  } catch (err) {
    res.status(500).json({ error: 'Error verificando autenticación' })
  }
}