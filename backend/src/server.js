// =============================================
// src/server.js — Servidor principal Express
// =============================================cd
import express from 'express'
import cors from 'cors'

import productosRoutes from './routes/productos.js'
import pedidosRoutes   from './routes/pedidos.js'
import clientesRoutes  from './routes/clientes.js'
import inventarioRoutes from './routes/inventario.js'
import reportesRoutes  from './routes/reportes.js'
import authRoutes      from './routes/auth.js'
import configRoutes    from './routes/configuracion.js'

const app  = express()
const PORT = process.env.PORT || 3000

// ── Middlewares ──────────────────────────────
app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    'http://localhost:5173',  // Vite dev
    'http://localhost:3000',
  ],
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ── Rutas ────────────────────────────────────
app.use('/api/auth',          authRoutes)
app.use('/api/productos',     productosRoutes)
app.use('/api/pedidos',       pedidosRoutes)
app.use('/api/clientes',      clientesRoutes)
app.use('/api/inventario',    inventarioRoutes)
app.use('/api/reportes',      reportesRoutes)
app.use('/api/configuracion', configRoutes)

// ── Health check ─────────────────────────────
app.get('/', (_req, res) => {
  res.json({ ok: true, mensaje: '🌿 Colombia Verde API funcionando' })
})

// ── Manejo de errores ────────────────────────
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: err.message || 'Error interno del servidor' })
})

app.listen(PORT, () => {
  console.log(`🌿 Colombia Verde API corriendo en http://localhost:${PORT}`)
})