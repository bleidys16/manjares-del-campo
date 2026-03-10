// =============================================
// src/lib/api.js
// Todas las llamadas al backend Express
// =============================================

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const getToken = () => localStorage.getItem('cv_token')

async function fetchApi(endpoint, options = {}) {
  const token = getToken()
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Error en la petición')
  return data
}

export const productosApi = {
  getAll: (params = {}) => {
    const q = new URLSearchParams(params).toString()
    return fetchApi(`/api/productos${q ? '?' + q : ''}`)
  },
  getDestacados: () => fetchApi('/api/productos/destacados'),
}

export const pedidosApi = {
  crear: (body) => fetchApi('/api/pedidos', { method: 'POST', body: JSON.stringify(body) }),
  getById: (id) => fetchApi(`/api/pedidos/${id}`),
  getFacturaUrl: (id) => `${BASE_URL}/api/pedidos/${id}/factura`,
}

export const configuracionApi = {
  getTienda: () => fetchApi('/api/configuracion/tienda'),
  getPagos:  () => fetchApi('/api/configuracion/pagos'),
}