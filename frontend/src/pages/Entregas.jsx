import { MapPin, Clock, Truck, Phone } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Carrito from '../components/Carrito'

const zonas = [
  { zona: 'Barranquilla Norte', barrios: 'El Prado, Altos del Prado, Villa Country, Alto Prado', tiempo: 'Mismo día' },
  { zona: 'Barranquilla Centro', barrios: 'Centro histórico, El Rosario, Barrio Abajo', tiempo: 'Mismo día' },
  { zona: 'Barranquilla Sur', barrios: 'Los Andes, La Paz, El Recreo, Villa Santos', tiempo: 'Mismo día' },
  { zona: 'Barranquilla Occidente', barrios: 'Las Flores, La Playa, Siape, Los Olivos', tiempo: 'Mismo día' },
  { zona: 'Soledad', barrios: 'Centro Soledad, El Oasis, Villa Estadio, Los Girasoles', tiempo: 'Menos de 24h' },
]

function Entregas() {
  return (
    <div>
      <Navbar />
      <Carrito />

      <div className="min-h-screen bg-[#fffbf5] pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-6">

          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-green-500 text-xs font-bold uppercase tracking-widest mb-3">
              Cobertura
            </p>

            <h1 className="text-4xl font-bold text-green-900 tracking-tight mb-4">
              Zonas de entrega
            </h1>

            <p className="text-gray-500 text-base leading-relaxed max-w-xl mx-auto">
              Hacemos entregas en Barranquilla y Soledad. Consulta si llegamos a tu barrio.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {[
              { icono: Truck, titulo: 'Entrega el mismo día', desc: 'Pedidos antes del mediodía' },
              { icono: MapPin, titulo: 'Barranquilla y Soledad', desc: 'Toda el área metropolitana' },
              { icono: Clock, titulo: 'Lunes a sábado', desc: '8:00 am — 6:00 pm' },
            ].map((s) => {
              const Icono = s.icono
              return (
                <div
                  key={s.titulo}
                  className="bg-white border border-gray-100 rounded-2xl p-6 flex items-start gap-4"
                >
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                    <Icono size={20} className="text-green-600" />
                  </div>

                  <div>
                    <p className="font-bold text-green-900 text-sm mb-1">
                      {s.titulo}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {s.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Mapa */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
              <iframe
                title="Zona de entrega Barranquilla"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125248.47!2d-74.9964!3d10.9685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef42d4285de8bcf%3A0xaac6b31bf1273e7a!2sBarranquilla%2C%20Atl%C3%A1ntico!5e0!3m2!1ses!2sco!4v1"
                width="100%"
                height="380"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Tabla de zonas */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">

              <div className="px-6 py-4 border-b border-gray-50">
                <h3 className="font-bold text-green-900 text-sm">
                  Barrios con cobertura
                </h3>
              </div>

              <div className="divide-y divide-gray-50">
                {zonas.map((z) => (
                  <div key={z.zona} className="px-6 py-4">

                    <div className="flex items-center justify-between mb-1">
                      <p className="font-bold text-green-900 text-sm">
                        {z.zona}
                      </p>

                      <span className="text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                        {z.tiempo}
                      </span>
                    </div>

                    <p className="text-gray-400 text-xs leading-relaxed">
                      {z.barrios}
                    </p>

                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* CTA */}
          <div className="mt-12 bg-[#052e16] rounded-2xl p-8 text-center">

            <p className="text-white font-bold text-lg mb-2">
              ¿No ves tu barrio en la lista?
            </p>

            <p className="text-white/50 text-sm mb-6">
              Escríbenos y verificamos si podemos llegar hasta ti.
            </p>

            <a
              href="https://wa.me/573238849203"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25d366] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#1ebe5d] transition-colors uppercase tracking-wider text-sm"
            >
              <Phone size={16} />
              Consultar por WhatsApp
            </a>

          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Entregas