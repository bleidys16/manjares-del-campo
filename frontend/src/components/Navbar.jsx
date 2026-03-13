import { useState } from 'react'
import { ShoppingCart, MessageCircle, Menu, X } from 'lucide-react'
import { useCarrito } from '../context/CarritoContext'
import { Link } from 'react-router-dom'

function Navbar() {
  const { totalItems, setAbierto } = useCarrito()
  const [menuAbierto, setMenuAbierto] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-green-100 px-4 md:px-10 lg:px-14 py-2 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 md:gap-3">
          <img src="/logo.png" alt="Manjares del Campo" className="w-12 h-12 md:w-16 md:h-16 object-contain" />
          <div className="hidden sm:block">
            <p className="font-bold text-green-900 text-sm md:text-base leading-none">
              Manjares del Campo
            </p>
            <p className="text-green-600 text-[10px] md:text-xs tracking-widest uppercase mt-0.5">
              Productos del Campo
            </p>
          </div>
        </Link>

        {/* Links desktop */}
        <ul className="hidden md:flex gap-6 lg:gap-8 list-none">
          <li>
            <Link to="/" className="text-gray-500 hover:text-green-700 text-sm font-semibold uppercase tracking-wider transition-colors">
              Inicio
            </Link>
          </li>

          <li>
            <Link to="/catalogo" className="text-gray-500 hover:text-green-700 text-sm font-semibold uppercase tracking-wider transition-colors">
              Catálogo
            </Link>
          </li>

          <li>
            <a href="#nosotros" className="text-gray-500 hover:text-green-700 text-sm font-semibold uppercase tracking-wider transition-colors">
              Nosotros
            </a>
          </li>

          <li>
            <a href="#contacto" className="text-gray-500 hover:text-green-700 text-sm font-semibold uppercase tracking-wider transition-colors">
              Contacto
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-2 md:gap-3">

          {/* WhatsApp desktop */}
          <a
            href="https://wa.me/573238849203"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex bg-[#25d366] text-white text-xs font-bold px-4 py-2 rounded-lg items-center gap-2 hover:bg-[#1ebe5d] transition-colors uppercase tracking-wider"
          >
            <MessageCircle size={15} />
            WhatsApp
          </a>

          {/* Carrito */}
          <button
            onClick={() => setAbierto(true)}
            className="relative bg-green-50 border border-green-100 rounded-lg w-9 h-9 md:w-10 md:h-10 flex items-center justify-center hover:bg-green-100 transition-colors"
          >
            <ShoppingCart size={18} className="text-green-800" />

            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>

          {/* Botón hamburguesa */}
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="md:hidden bg-green-50 border border-green-100 rounded-lg w-9 h-9 flex items-center justify-center hover:bg-green-100 transition-colors"
          >
            {menuAbierto ? (
              <X size={18} className="text-green-800" />
            ) : (
              <Menu size={18} className="text-green-800" />
            )}
          </button>

        </div>
      </nav>

      {/* Menú móvil */}
      {menuAbierto && (
        <div className="fixed top-[64px] left-0 right-0 z-40 bg-white border-b border-green-100 shadow-lg md:hidden">

          <ul className="flex flex-col px-6 py-5 gap-5 list-none">

            <li>
              <Link
                to="/"
                onClick={() => setMenuAbierto(false)}
                className="text-gray-600 hover:text-green-700 text-sm font-semibold uppercase tracking-wider transition-colors"
              >
                Inicio
              </Link>
            </li>

            <li>
              <Link
                to="/catalogo"
                onClick={() => setMenuAbierto(false)}
                className="text-gray-600 hover:text-green-700 text-sm font-semibold uppercase tracking-wider transition-colors"
              >
                Catálogo
              </Link>
            </li>

            <li>
              <a
                href="#nosotros"
                onClick={() => setMenuAbierto(false)}
                className="text-gray-600 hover:text-green-700 text-sm font-semibold uppercase tracking-wider transition-colors"
              >
                Nosotros
              </a>
            </li>

            <li>
              <a
                href="#contacto"
                onClick={() => setMenuAbierto(false)}
                className="text-gray-600 hover:text-green-700 text-sm font-semibold uppercase tracking-wider transition-colors"
              >
                Contacto
              </a>
            </li>

            <li>
              <a
                href="https://wa.me/573238849203"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25d366] text-white text-xs font-bold px-4 py-2 rounded-lg w-fit hover:bg-[#1ebe5d] transition-colors uppercase tracking-wider"
              >
                <MessageCircle size={15} />
                WhatsApp
              </a>
            </li>

          </ul>

        </div>
      )}
    </>
  )
}

export default Navbar