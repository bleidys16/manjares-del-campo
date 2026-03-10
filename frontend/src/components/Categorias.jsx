const categorias = [
  {
    img: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=400&fit=crop',
    nombre: 'Frutas',
    cantidad: 12
  },
  {
    img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop',
    nombre: 'Verduras',
    cantidad: 18
  },
  {
    img: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&h=400&fit=crop',
    nombre: 'Lácteos',
    cantidad: 8
  },
  {
    img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
    nombre: 'Granos',
    cantidad: 10
  },
  {
    img: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&h=400&fit=crop',
    nombre: 'Hierbas',
    cantidad: 6
  },
]

function Categorias() {
  return (
    <section className="py-20 bg-white" id="catalogo">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-green-600 text-sm font-medium uppercase tracking-widest mb-2">Explora</p>
            <h2 className="text-4xl font-bold text-green-900">Categorías de productos</h2>
          </div>
          <a href="#" className="text-green-600 text-sm font-medium hover:underline">Ver todo →</a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categorias.map((cat) => (
            <div
              key={cat.nombre}
              className="bg-green-50 border border-transparent hover:border-green-200 hover:shadow-lg rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={cat.img}
                alt={cat.nombre}
                className="w-full h-32 object-cover"
              />
              <div className="p-4 text-center">
                <p className="font-semibold text-green-900 text-sm">{cat.nombre}</p>
                <p className="text-gray-400 text-xs mt-1">{cat.cantidad} productos</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Categorias