const express = require('express')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

// Middlewares
app.use(cors())
app.use(express.json())

// Rutas de la API (las iremos agregando)
// app.use('/api/productos', require('./src/routes/productos'))
// app.use('/api/pedidos', require('./src/routes/pedidos'))
// app.use('/api/admin', require('./src/routes/admin'))

// Sirve el frontend de React en producción
app.use(express.static(path.join(__dirname, '../frontend/dist')))
app.get('/{*path}', (req, res) => {
res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
})

app.listen(PORT, () => {
console.log(`Servidor corriendo en http://localhost:${PORT}`)
})