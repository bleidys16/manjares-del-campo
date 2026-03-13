import { Facebook, Instagram, Twitter, MapPin, Smartphone, KeyRound, MessageCircle, Banknote} from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-[#052e16] text-white" id="contacto">

      <div className="px-14 py-12 grid grid-cols-4 gap-8">

        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.png" alt="Manjares del campo" className="w-16 h-16 object-contain" />
            <div>
              <p className="font-bold text-sm leading-none">Manjares del campo</p>
              <p className="text-white/40 text-xs tracking-widest uppercase mt-0.5">Productos del Campo</p>
            </div>
          </div>
          <p className="text-white/45 text-sm leading-relaxed mb-5">
            Llevamos lo mejor del campo colombiano a tu hogar en Barranquilla y su área metropolitana.
          </p>
          <div className="flex gap-2">
            <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
              <Facebook size={15} />
            </a>
            <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
              <Instagram size={15} />
            </a>
            <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
              <Twitter size={15} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-white/70">Productos</h4>
          <ul className="space-y-2.5">
            {['Frutas', 'Verduras', 'Lácteos', 'Granos', 'Hierbas'].map((item) => (
              <li key={item}>
                <a href="#" className="text-white/45 text-sm hover:text-white transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-white/70">Información</h4>
          <ul className="space-y-2.5">
            {['Nosotros', 'Cómo comprar', 'Zonas de entrega', 'Preguntas frecuentes'].map((item) => (
              <li key={item}>
                <a href="#" className="text-white/45 text-sm hover:text-white transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-white/70">Contacto</h4>
          <ul className="space-y-2.5">
            <li className="flex items-center gap-2 text-white/45 text-sm">
              <MapPin size={14} /> Barranquilla, Colombia
            </li>
            <li className="flex items-center gap-2 text-white/45 text-sm">
              <Smartphone size={14} /> Nequi: 300 123 4567
            </li>
            <li className="flex items-center gap-2 text-white/45 text-sm">
              <KeyRound size={14} /> Daviplata: 300 123 4567
            </li>
            <li className="flex items-center gap-2">
              <a href="#" className="flex items-center gap-2 text-white/45 text-sm hover:text-white transition-colors">
                <MessageCircle size={14} /> WhatsApp
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div className="border-t border-white/10 px-14 py-5 flex items-center justify-between">
        <p className="text-white/30 text-xs">© 2025 Manjares del campo — Astrid Blanco. Todos los derechos reservados.</p>
        <p className="text-white/30 text-xs">Hecho con 💚 en Barranquilla</p>
      </div>

    </footer>
  )
}

export default Footer