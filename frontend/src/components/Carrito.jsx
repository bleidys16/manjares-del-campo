import { X, Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react'
import { useCarrito } from '../context/CarritoContext'

function Carrito() {
  const { carrito, abierto, setAbierto, quitarProducto, cambiarCantidad, totalPrecio } = useCarrito()

  return (
    <>
      {/* Overlay */}
      {abierto && (
        <div
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          onClick={() => setAbierto(false)}
        />
      )}

      {/* Panel lateral */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${abierto ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} className="text-green-700" />
            <h2 className="font-bold text-green-900 text-lg">Mi carrito</h2>
          </div>
          <button
            onClick={() => setAbierto(false)}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Productos */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {carrito.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart size={48} className="text-gray-200 mb-4" />
              <p className="text-gray-400 font-medium">Tu carrito está vacío</p>
              <p className="text-gray-300 text-sm mt-1">Agrega productos para comenzar</p>
            </div>
          ) : (
            <div className="space-y-4">
              {carrito.map((p) => (
                <div key={p.id} className="flex gap-4 items-center border border-gray-100 rounded-xl p-3">
                  <img src={p.img} alt={p.nombre} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <p className="font-bold text-green-900 text-sm">{p.nombre}</p>
                    <p className="text-green-600 text-sm font-semibold mt-0.5">
                      ${p.precio.toLocaleString('es-CO')}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => cambiarCantidad(p.id, p.cantidad - 1)}
                        className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition-colors"
                      >
                        <Minus size={12} className="text-green-700" />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{p.cantidad}</span>
                      <button
                        onClick={() => cambiarCantidad(p.id, p.cantidad + 1)}
                        className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition-colors"
                      >
                        <Plus size={12} className="text-green-700" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => quitarProducto(p.id)}
                    className="text-gray-300 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {carrito.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 font-medium">Total</span>
              <span className="text-green-900 font-bold text-xl">
                ${totalPrecio.toLocaleString('es-CO')}
              </span>
            </div>
            <button className="w-full bg-green-600 text-white font-bold py-3.5 rounded-xl hover:bg-green-700 transition-colors uppercase tracking-wider text-sm">
              Ir al checkout →
            </button>
          </div>
        )}

      </div>
    </>
  )
}

export default Carrito