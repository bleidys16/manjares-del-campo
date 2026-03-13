import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Categorias from '../components/Categorias'
import ComoComprar from '../components/ComoComprar'
import Nosotros from '../components/Nosotros'
import Footer from '../components/Footer'
import Carrito from '../components/Carrito'

function Inicio() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Categorias />
      <ComoComprar />
      <Nosotros />
      <Footer />
      <Carrito />
    </div>
  )
}

export default Inicio