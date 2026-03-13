import { ShoppingBasket, MessageCircle, CheckCheck, Banknote, Home } from 'lucide-react'

const pasos = [
  {
    icono: ShoppingBasket,
    numero: '01',
    titulo: 'Elige tus productos',
    desc: 'Navega por nuestro catálogo y agrega al carrito todo lo que necesites.'
  },
  {
    icono: MessageCircle,
    numero: '02',
    titulo: 'Pide por WhatsApp',
    desc: 'Con un clic te enviamos tu pedido completo directo a nuestro WhatsApp.'
  },
  {
    icono: CheckCheck,
    numero: '03',
    titulo: 'Confirma tu pedido',
    desc: 'Te confirmamos disponibilidad y te damos el total final de tu compra.'
  },
  {
    icono: Banknote,
    numero: '04',
    titulo: 'Realiza tu pago',
    desc: 'Paga por Nequi, Daviplata o contra entrega. Sin tarjetas ni complicaciones.'
  },
  {
    icono: Home,
    numero: '05',
    titulo: 'Recibe en casa',
    desc: 'Entregamos en Barranquilla y Soledad en menos de 24 horas.'
  },
]

function ComoComprar() {
  return (
    <section className="py-20 bg-[#fffbf5]" id="como-comprar">
      <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-14">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-green-500 text-xs font-bold uppercase tracking-widest mb-3">
            Simple y rápido
          </p>

          <h2 className="text-4xl font-bold text-green-900 tracking-tight mb-4">
            ¿Cómo comprar?
          </h2>

          <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            En pocos pasos recibe productos frescos del campo directo en tu hogar.
          </p>
        </div>

        {/* Pasos */}
        <div className="relative">

          {/* Línea conectora */}
          <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-green-100 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
            {pasos.map((paso) => {
              const Icono = paso.icono

              return (
                <div key={paso.numero} className="flex flex-col items-center text-center">

                  {/* Círculo icono */}
                  <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-100 flex items-center justify-center mb-4 relative">
                    <Icono size={28} className="text-green-600" />

                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-green-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {paso.numero.replace('0', '')}
                    </span>
                  </div>

                  <h3 className="font-bold text-green-900 text-sm mb-2">
                    {paso.titulo}
                  </h3>

                  <p className="text-gray-400 text-xs leading-relaxed">
                    {paso.desc}
                  </p>

                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href="/catalogo"
            className="inline-flex items-center gap-2 bg-green-600 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-green-700 transition-colors uppercase tracking-wider text-sm"
          >
            <ShoppingBasket size={18} />
            Ir al catálogo
          </a>
        </div>

      </div>
    </section>
  )
}

export default ComoComprar