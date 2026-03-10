const productos = [
  {
    id: 1,
    nombre: 'Mango Tommy',
    categoria: 'Frutas',
    precio: 4500,
    unidad: 'und',
    tag: 'Fresco',
    img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    nombre: 'Aguacate Hass',
    categoria: 'Frutas',
    precio: 3000,
    unidad: 'und',
    tag: 'Orgánico',
    img: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    nombre: 'Tomate Chonto',
    categoria: 'Verduras',
    precio: 2500,
    unidad: 'kg',
    tag: null,
    img: 'https://images.unsplash.com/photo-1558818498-28c1e002b655?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    nombre: 'Mazorca Criolla',
    categoria: 'Granos',
    precio: 1500,
    unidad: 'und',
    tag: 'Local',
    img: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    nombre: 'Plátano Hartón',
    categoria: 'Frutas',
    precio: 1200,
    unidad: 'und',
    tag: 'Local',
    img: 'https://images.unsplash.com/photo-1610911434407-54dbc487af49?q=80&w=869&auto=format&fit=crop'
  },
  {
    id: 6,
    nombre: 'Yuca Fresca',
    categoria: 'Verduras',
    precio: 3500,
    unidad: 'kg',
    tag: 'Fresco',
    img: 'https://plus.unsplash.com/premium_photo-1725467480335-bae427eb198a?q=80&w=870&auto=format&fit=crop'
  },
  {
    id: 7,
    nombre: 'Ahuyama',
    categoria: 'Verduras',
    precio: 3000,
    unidad: 'kg',
    tag: 'Local',
    img: 'https://imagenes2.eltiempo.com/files/image_600_455/uploads/2023/05/05/64554a0d31ffc.jpeg'
  },
  {
    id: 8,
    nombre: 'Queso Costeño',
    categoria: 'Lácteos',
    precio: 12000,
    unidad: '500g',
    tag: 'Artesanal',
    img: 'https://a.storyblok.com/f/160385/b281ae407f/cronica-queso-costeno.jpg'
  },
]

function Productos() {
  return (
    <section className="py-20 bg-[#fffbf5]" id="productos">
      <div className="max-w-7xl mx-auto px-14">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-green-500 text-xs font-bold uppercase tracking-widest mb-2">Lo más pedido</p>
            <h2 className="text-4xl font-bold text-green-900 tracking-tight">Productos destacados</h2>
          </div>
          <a href="#" className="text-green-700 text-sm font-semibold border-b border-green-200 pb-0.5 hover:border-green-500 transition-colors">
            Ver catálogo →
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {productos.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Imagen */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={p.img}
                  alt={p.nombre}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                {p.tag && (
                  <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                    {p.tag}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-green-600 text-xs font-bold uppercase tracking-wider mb-1">{p.categoria}</p>
                <p className="text-green-900 font-bold text-base mb-3">{p.nombre}</p>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-green-900 font-bold text-lg">
                      ${p.precio.toLocaleString('es-CO')}
                    </span>
                    <span className="text-gray-400 text-xs ml-1">/ {p.unidad}</span>
                  </div>
                  <button className="bg-green-700 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-green-900 transition-colors">
                    + Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Productos