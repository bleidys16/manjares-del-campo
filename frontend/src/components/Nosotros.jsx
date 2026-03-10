import { Leaf, Truck, CreditCard, BadgeCheck } from 'lucide-react'

const beneficios = [
  {
    icono: Leaf,
    titulo: 'Directo del campo',
    desc: 'Trabajamos con productores locales colombianos para traerte los productos más frescos sin intermediarios.'
  },
  {
    icono: Truck,
    titulo: 'Entrega el mismo día',
    desc: 'Recibe tus productos frescos en la puerta de tu casa en Barranquilla y el área metropolitana.'
  },
  {
    icono: CreditCard,
    titulo: 'Pago fácil',
    desc: 'Paga con Nequi o Daviplata sin complicaciones. Sin tarjetas ni registros obligatorios.'
  },
  {
    icono: BadgeCheck,
    titulo: 'Calidad garantizada',
    desc: 'Seleccionamos cada producto a mano. Si no estás satisfecho, te lo resolvemos por WhatsApp.'
  },
]

function Nosotros() {
  return (
    <section className="py-20 bg-green-50" id="nosotros">
      <div className="max-w-7xl mx-auto px-14">

        <div className="text-center mb-14">
          <p className="text-green-500 text-xs font-bold uppercase tracking-widest mb-3">Quiénes somos</p>
          <h2 className="text-4xl font-bold text-green-900 tracking-tight mb-4">
            Del campo colombiano
            <span
              className="block text-green-600 mt-1"
              style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: 'italic', fontWeight: 400 }}
            >
              directo a tu mesa.
            </span>
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            Somos una tienda comprometida con llevar productos frescos y naturales del campo colombiano a los hogares de Barranquilla.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {beneficios.map((b) => {
            const Icono = b.icono
            return (
              <div
                key={b.titulo}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-green-200 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                  <Icono size={24} className="text-green-600" />
                </div>
                <h3 className="text-green-900 font-bold text-base mb-2">{b.titulo}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default Nosotros