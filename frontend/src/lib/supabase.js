// =============================================
// src/lib/supabase.js  (va en el FRONTEND)
// Cliente Supabase para llamadas directas desde React
// =============================================
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)