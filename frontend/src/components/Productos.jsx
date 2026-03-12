import { useEffect, useState } from 'react'
import { useCarrito } from '../context/CarritoContext'
import { productosApi } from '../lib/api'

const CATEGORIAS = ['todos', 'frutas', 'verduras', 'tuberculos', 'lacteos', 'granos', 'hierbas', 'otros']

function Productos() {
  const { agregarAlCarrito } = useCarrito()
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [categoriaActiva, setCategoriaActiva] = useState('todos')

  useEffect(() => {
    cargarProductos(categoriaActiva)
  }, [categoriaActiva])

  useEffect(() => {
  const handler = (e) => setCategoriaActiva(e.detail)
  window.addEventListener('filtrarCategoria', handler)
  return () => window.removeEventListener('filtrarCategoria', handler)
}, [])

  async function cargarProductos(categoria) {
    setCargando(true)
    try {
      const params = categoria !== 'todos' ? { categoria } : {}
      const data = await productosApi.getAll(params)
      setProductos(data)
    } catch (err) {
      console.error('Error cargando productos:', err)
    } finally {
      setCargando(false)
    }
  }

  const adaptarProducto = (p) => ({
    id: p.id,
    nombre: p.nombre,
    categoria: p.categoria,
    precio: p.precio,
    unidad: p.unidad,
    img: p.imagen_url || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    tag: p.tags?.[0] || (p.destacado ? 'Destacado' : null),
  })

  return (
    <section className="py-20 bg-[#fffbf5]" id="productos">
      <div className="max-w-7xl mx-auto px-14">

        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-green-500 text-xs font-bold uppercase tracking-widest mb-2">Lo más pedido</p>
            <h2 className="text-4xl font-bold text-green-900 tracking-tight">Productos destacados</h2>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                categoriaActiva === cat
                  ? 'bg-green-700 text-white'
                  : 'bg-white text-green-700 border border-green-200 hover:border-green-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading skeleton */}
        {cargando && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
                <div className="h-44 bg-gray-100" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                  <div className="h-8 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!cargando && productos.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-semibold">No hay productos en esta categoría</p>
          </div>
        )}

        {!cargando && productos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {productos.map((p) => {
              const prod = adaptarProducto(p)
              return (
                <div key={prod.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={prod.img}
                      alt={prod.nombre}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop' }}
                    />
                    {prod.tag && (
                      <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                        {prod.tag}
                      </span>
                    )}
                    {p.stock === 0 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">Agotado</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-green-600 text-xs font-bold uppercase tracking-wider mb-1">{prod.categoria}</p>
                    <p className="text-green-900 font-bold text-base mb-3">{prod.nombre}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-green-900 font-bold text-lg">${prod.precio.toLocaleString('es-CO')}</span>
                        <span className="text-gray-400 text-xs ml-1">/ {prod.unidad}</span>
                      </div>
                      <button
                        onClick={() => agregarAlCarrito(prod)}
                        disabled={p.stock === 0}
                        className="bg-green-700 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-green-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        + Agregar
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

      </div>
    </section>
  )
}

export default Productos