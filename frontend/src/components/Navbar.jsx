function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-green-100 px-14 py-3 flex items-center justify-between">

      {/* Logo */}
      <a href="/" className="flex items-center gap-3 text-decoration-none">
        <img src="/logo.png" alt="Colombia Verde" className="w-14 h-14 object-contain" />
        <div>
          <p className="font-bold text-green-900 text-base leading-none">Colombia Verde</p>
          <p className="text-green-600 text-xs tracking-widest uppercase mt-0.5">Productos del Campo</p>
        </div>
      </a>

      {/* Links */}
      <ul className="hidden md:flex gap-8 list-none">
        <li><a href="#" className="text-gray-500 hover:text-green-700 text-sm font-600 font-semibold uppercase tracking-wider transition-colors">Inicio</a></li>
        <li><a href="#categorias" className="text-gray-500 hover:text-green-700 text-sm font-semibold uppercase tracking-wider transition-colors">Catálogo</a></li>
        <li><a href="#nosotros" className="text-gray-500 hover:text-green-700 text-sm font-semibold uppercase tracking-wider transition-colors">Nosotros</a></li>
        <li><a href="#contacto" className="text-gray-500 hover:text-green-700 text-sm font-semibold uppercase tracking-wider transition-colors">Contacto</a></li>
      </ul>

      {/* Acciones */}
      <div className="flex items-center gap-3">
        <a
          href="https://wa.me/573001234567"
          target="_blank"
          className="bg-[#25d366] text-white text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#1ebe5d] transition-colors uppercase tracking-wider"
        >
          💬 WhatsApp
        </a>
        <button className="relative bg-green-50 border border-green-100 rounded-lg w-10 h-10 flex items-center justify-center hover:bg-green-100 transition-colors text-lg">
          🛒
          <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
            0
          </span>
        </button>
      </div>

    </nav>
  )
}

export default Navbar