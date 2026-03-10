function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">

      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1800&h=1000&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Overlay verde oscuro */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(110deg, rgba(5,46,22,0.92) 0%, rgba(5,46,22,0.75) 45%, rgba(5,46,22,0.45) 100%)'
        }}
      />

      {/* Contenido */}
      <div className="relative z-20 px-14 pt-32 pb-36 max-w-3xl">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-green-300/30 rounded-full px-4 py-1.5 mb-7">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span className="text-green-300 text-xs font-semibold uppercase tracking-widest">
            Entrega en Barranquilla y área metropolitana
          </span>
        </div>

        {/* Título */}
        <h1 className="text-6xl font-bold text-white leading-tight tracking-tight mb-2">
          Del campo a tu mesa,
        </h1>
        <span
          className="block text-green-300 mb-6 text-6xl leading-tight"
          style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: 'italic', fontWeight: 400 }}
        >
          frescos y naturales.
        </span>

        {/* Descripción */}
        <p className="text-white/80 text-base font-light leading-relaxed max-w-lg mb-10">
          Conectamos productores del campo colombiano con tu hogar. Frutas, verduras, lácteos y granos frescos entregados en el día en Barranquilla.
        </p>

        {/* Botones */}
        <div className="flex gap-3 flex-wrap">
          <a
            href="#catalogo"
            className="bg-green-500 text-white border-none rounded-lg px-8 py-3.5 text-sm font-bold uppercase tracking-wider hover:bg-green-600 transition-all shadow-lg shadow-green-500/30"
          >
            Ver Catálogo →
          </a>
          <a
            href="#como-funciona"
            className="bg-transparent text-white border border-white/35 rounded-lg px-8 py-3.5 text-sm font-semibold uppercase tracking-wider hover:border-white/70 transition-all"
          >
            ¿Cómo funciona?
          </a>
        </div>
      </div>

      {/* Barra de stats */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 grid grid-cols-4"
        style={{ background: 'rgba(5,46,22,0.88)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(134,239,172,0.12)' }}
      >
        {[
          { num: '+50', label: 'Productos frescos' },
          { num: '100%', label: 'Natural y orgánico' },
          { num: '1 día', label: 'Entrega local' },
          { num: '📱', label: 'Nequi · Daviplata' },
        ].map((s) => (
          <div key={s.label} className="py-5 text-center border-r border-white/[0.07] last:border-r-0">
            <div className="text-2xl font-bold text-green-300 leading-none tracking-tight">{s.num}</div>
            <div className="text-xs font-semibold text-white/40 uppercase tracking-widest mt-1.5">{s.label}</div>
          </div>
        ))}
      </div>

    </section>
  )
}

export default Hero