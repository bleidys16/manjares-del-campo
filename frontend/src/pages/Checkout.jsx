import { useState } from 'react'
import { useCarrito } from '../context/CarritoContext'
import { MapPin, User, Phone, ShoppingBag, MessageCircle, Smartphone, KeyRound, Banknote, Leaf } from 'lucide-react'

const metodosPago = [
  { id: 'nequi', label: 'Nequi', icon: Smartphone, desc: 'Te enviamos el QR para transferir' },
  { id: 'daviplata', label: 'Daviplata', icon: KeyRound, desc: 'Te enviamos la llave para transferir' },
  { id: 'contraentrega', label: 'Contra entrega', icon: Banknote, desc: 'Pagas en efectivo al recibir' },
]

function Checkout() {
  const { carrito, totalPrecio } = useCarrito()
  const [form, setForm] = useState({ nombre: '', telefono: '', direccion: '' })
  const [metodoPago, setMetodoPago] = useState('nequi')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleWhatsApp = () => {
    if (!form.nombre || !form.telefono || !form.direccion) {
      alert('Por favor completa todos los campos.')
      return
    }

    const items = carrito.map(p =>
      `• ${p.nombre} x${p.cantidad} — $${(p.precio * p.cantidad).toLocaleString('es-CO')}`
    ).join('\n')

    const mensaje = `
Nuevo pedido - Colombia Verde

Cliente: ${form.nombre}
Telefono: ${form.telefono}
Direccion: ${form.direccion}
Pago: ${metodoPago}

Productos:
${items}

Total: $${totalPrecio.toLocaleString('es-CO')}

Pedido realizado desde la web.
    `.trim()

    const url = `https://wa.me/573001234567?text=${encodeURIComponent(mensaje)}`
    window.open(url, '_blank')
  }

  if (carrito.length === 0) {
    return (
      <div className="min-h-screen bg-[#fffbf5] flex flex-col items-center justify-center">
        <ShoppingBag size={56} className="text-gray-200 mb-4" />
        <p className="text-gray-400 font-medium text-lg">Tu carrito está vacío</p>
        <a href="/" className="mt-4 text-green-600 font-semibold hover:underline">← Volver al inicio</a>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fffbf5] pt-24 pb-16">

      {/* Navbar simple */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-green-100 px-14 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Colombia Verde" className="w-11 h-11 object-contain" />
          <div>
            <p className="font-bold text-green-900 text-base leading-none">Colombia Verde</p>
            <p className="text-green-600 text-xs tracking-widest uppercase mt-0.5">Productos del Campo</p>
          </div>
        </a>
        <div className="flex items-center gap-2 text-green-700">
          <Leaf size={16} />
          <span className="text-sm font-semibold">Finalizar pedido</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="mb-10">
          <a href="/" className="text-green-600 text-sm font-semibold hover:underline">← Volver</a>
          <h1 className="text-3xl font-bold text-green-900 mt-3 tracking-tight">Finalizar pedido</h1>
          <p className="text-gray-500 mt-1">Completa tus datos y elige cómo pagar</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Formulario */}
          <div className="space-y-6">

            {/* Datos personales */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="font-bold text-green-900 text-lg mb-5">Tus datos</h2>
              <div className="space-y-4">

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <User size={13} /> Nombre completo
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Ej: María García"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Phone size={13} /> Teléfono
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    placeholder="Ej: 300 123 4567"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <MapPin size={13} /> Dirección de entrega
                  </label>
                  <input
                    type="text"
                    name="direccion"
                    value={form.direccion}
                    onChange={handleChange}
                    placeholder="Ej: Cra 50 #80-20, Barranquilla"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-400 transition-colors"
                  />
                </div>

              </div>
            </div>

            {/* Método de pago */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="font-bold text-green-900 text-lg mb-5">Método de pago</h2>
              <div className="space-y-3">
                {metodosPago.map((m) => {
                  const Icono = m.icon
                  return (
                    <button
                      key={m.id}
                      onClick={() => setMetodoPago(m.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                        metodoPago === m.id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        metodoPago === m.id ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500'
                      }`}>
                        <Icono size={18} />
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-green-900 text-sm">{m.label}</p>
                        <p className="text-gray-400 text-xs">{m.desc}</p>
                      </div>
                      <div className={`ml-auto w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        metodoPago === m.id ? 'border-green-500' : 'border-gray-300'
                      }`}>
                        {metodoPago === m.id && <div className="w-2 h-2 rounded-full bg-green-500" />}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

          </div>

          {/* Resumen del pedido */}
          <div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-24">
              <h2 className="font-bold text-green-900 text-lg mb-5">Resumen del pedido</h2>

              <div className="space-y-3 mb-6">
                {carrito.map((p) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <img src={p.img} alt={p.nombre} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-green-900">{p.nombre}</p>
                      <p className="text-xs text-gray-400">x{p.cantidad}</p>
                    </div>
                    <p className="text-sm font-bold text-green-900">
                      ${(p.precio * p.cantidad).toLocaleString('es-CO')}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="font-bold text-green-900">${totalPrecio.toLocaleString('es-CO')}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-500 font-medium">Domicilio</span>
                  <span className="font-bold text-green-600">Gratis</span>
                </div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                  <span className="font-bold text-green-900">Total</span>
                  <span className="font-bold text-green-900 text-xl">${totalPrecio.toLocaleString('es-CO')}</span>
                </div>
              </div>

              <button
                onClick={handleWhatsApp}
                className="w-full bg-[#25d366] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#1ebe5d] transition-colors uppercase tracking-wider text-sm"
              >
                <MessageCircle size={18} />
                Enviar pedido por WhatsApp
              </button>

              <p className="text-center text-gray-400 text-xs mt-3">
                Te contactaremos para confirmar tu pedido
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Checkout