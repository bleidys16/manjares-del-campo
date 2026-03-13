import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Carrito from '../components/Carrito'

const preguntas = [
  {
    pregunta: '¿Cómo hago un pedido?',
    respuesta: 'Navega por nuestro catálogo, agrega los productos al carrito y haz clic en "Ir al checkout". Completa tus datos y envía tu pedido por WhatsApp. Te confirmamos en minutos.'
  },
  {
    pregunta: '¿Cuáles son los métodos de pago?',
    respuesta: 'Aceptamos Nequi, Daviplata y pago contra entrega en efectivo. No necesitas tarjeta de crédito ni registro previo.'
  },
  {
    pregunta: '¿En qué zonas hacen entrega?',
    respuesta: 'Hacemos entregas en Barranquilla y Soledad. Si tienes dudas sobre tu zona específica escríbenos por WhatsApp y te confirmamos.'
  },
  {
    pregunta: '¿Cuánto tarda la entrega?',
    respuesta: 'Entregamos en menos de 24 horas. Los pedidos realizados antes del mediodía se entregan el mismo día.'
  },
  {
    pregunta: '¿Hay pedido mínimo?',
    respuesta: 'No manejamos pedido mínimo. Puedes pedir desde un solo producto.'
  },
  {
    pregunta: '¿Los productos son frescos?',
    respuesta: 'Sí, todos nuestros productos vienen directamente del campo colombiano. No manejamos productos con conservantes ni congelados.'
  },
  {
    pregunta: '¿Puedo cancelar o modificar mi pedido?',
    respuesta: 'Sí, puedes cancelar o modificar tu pedido escribiéndonos por WhatsApp antes de que sea despachado.'
  },
  {
    pregunta: '¿Tienen factura o comprobante?',
    respuesta: 'Sí, al confirmar tu pedido por WhatsApp te enviamos un resumen detallado que sirve como comprobante de compra.'
  },
]

function FAQ() {
  const [abierto, setAbierto] = useState(null)

  return (
    <div>
      <Navbar />
      <Carrito />

      <div className="min-h-screen bg-[#fffbf5] pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6">

          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-green-500 text-xs font-bold uppercase tracking-widest mb-3">
              Resolvemos tus dudas
            </p>

            <h1 className="text-4xl font-bold text-green-900 tracking-tight mb-4">
              Preguntas frecuentes
            </h1>

            <p className="text-gray-500 text-base leading-relaxed">
              ¿Tienes alguna duda? Aquí encontrarás las respuestas más comunes.
            </p>
          </div>

          {/* Acordeón */}
          <div className="space-y-3">
            {preguntas.map((p, i) => (
              <div
                key={p.pregunta}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setAbierto(abierto === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-green-50 transition-colors"
                >
                  <span className="font-bold text-green-900 text-sm pr-4">
                    {p.pregunta}
                  </span>

                  {abierto === i ? (
                    <ChevronUp size={18} className="text-green-600 shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-gray-400 shrink-0" />
                  )}
                </button>

                {abierto === i && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {p.respuesta}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA WhatsApp */}
          <div className="mt-14 bg-[#052e16] rounded-2xl p-8 text-center">

            <p className="text-white font-bold text-lg mb-2">
              ¿No encontraste tu respuesta?
            </p>

            <p className="text-white/50 text-sm mb-6">
              Escríbenos directamente por WhatsApp y te ayudamos.
            </p>

            <a
              href="https://wa.me/573238849203"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25d366] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#1ebe5d] transition-colors uppercase tracking-wider text-sm"
            >
              Escribir por WhatsApp
            </a>

          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default FAQ