const categorias = [
  {
    img: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=400&fit=crop",
    nombre: "Frutas",
    cantidad: 12,
  },
  {
    img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop",
    nombre: "Verduras",
    cantidad: 18,
  },
  {
    img: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&h=400&fit=crop",
    nombre: "Lácteos",
    cantidad: 8,
  },
  {
    img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
    nombre: "Granos",
    cantidad: 10,
  },
  {
    img: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&h=400&fit=crop",
    nombre: "Hierbas",
    cantidad: 6,
  },
];

function Categorias() {
  return (
    <section className="py-20 bg-white" id="categorias">
      <div className="max-w-7xl mx-auto px-14">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-green-500 text-xs font-bold uppercase tracking-widest mb-2">
              Explora
            </p>
            <h2 className="text-4xl font-bold text-green-900 tracking-tight">
              Categorías de productos
            </h2>
          </div>
          <a
            href="#"
            className="text-green-700 text-sm font-semibold border-b border-green-200 pb-0.5 hover:border-green-500 transition-colors"
          >
            Ver todas →
          </a>
        </div>

        {/* boton onclik*/}
        <div
          key={cat.nombre}
          onClick={() => {
            const event = new CustomEvent("filtrarCategoria", {
              detail: cat.nombre.toLowerCase(),
            });
            window.dispatchEvent(event);
            document
              .getElementById("productos")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="rounded-xl overflow-hidden cursor-pointer ..."
        ></div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categorias.map((cat) => (
            <div
              key={cat.nombre}
              onClick={() => {
                const event = new CustomEvent("filtrarCategoria", {
                  detail: cat.nombre.toLowerCase(),
                });
                window.dispatchEvent(event);
                document
                  .getElementById("productos")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <img
                src={cat.img}
                alt={cat.nombre}
                className="w-full h-36 object-cover"
              />
              <div className="bg-white px-4 py-3 flex items-center justify-between">
                <p className="font-700 text-green-900 text-sm font-bold">
                  {cat.nombre}
                </p>
                <span className="text-xs font-semibold text-green-700 bg-green-50 rounded-full px-2 py-0.5">
                  {cat.cantidad}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categorias;
