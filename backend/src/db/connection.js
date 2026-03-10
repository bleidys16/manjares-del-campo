// =============================================
// src/db/connection.js — Cliente Supabase
// =============================================
import { createClient } from '@supabase/supabase-js'

// Cliente público (para operaciones normales)
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

// Cliente admin (service role — solo para el backend)
// Tiene acceso total sin restricciones RLS
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)