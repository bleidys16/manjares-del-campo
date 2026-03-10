function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-green-100 px-6 py-4 flex items-center justify-between">
      
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center text-xl">
          🌿
        </div>
        <div>
          <p className="font-bold text-green-900 text-lg leading-none">Colombia Verde</p>
          <p className="text-green-600 text-xs tracking-widest uppercase">Productos del Campo</p>
        </div>
      </div>

      {/* Links */}
      <ul className="hidden md:flex gap-8 list-none">
        <li><a href="#" className="text-green-900 hover:text-green-600 text-sm transition-colors">Inicio</a></li>
        <li><a href="#catalogo" className="text-green-900 hover:text-green-600 text-sm transition-colors">Catálogo</a></li>
        <li><a href="#nosotros" className="text-green-900 hover:text-green-600 text-sm transition-colors">Nosotros</a></li>
        <li><a href="#contacto" className="text-green-900 hover:text-green-600 text-sm transition-colors">Contacto</a></li>
      </ul>

      {/* Acciones */}
      <div className="flex items-center gap-3">
        <a
          href="https://wa.me/573001234567"
          target="_blank"
          className="bg-[#25d366] text-white text-sm font-medium px-4 py-2 rounded-full flex items-center gap-2 hover:shadow-lg transition-shadow"
        >
          💬 WhatsApp
        </a>
        <button className="relative border-2 border-green-200 rounded-full w-11 h-11 flex items-center justify-center hover:border-green-500 transition-colors text-lg">
          🛒
          <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
            0
          </span>
        </button>
      </div>

    </nav>
  )
}

export default Navbar