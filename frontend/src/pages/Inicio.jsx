import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Categorias from '../components/Categorias'
import Nosotros from '../components/Nosotros'
import ComoComprar from '../components/ComoComprar'
import Footer from '../components/Footer'
import Carrito from '../components/Carrito'

function Inicio() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Categorias />
      <Nosotros />
      <ComoComprar />
      <Footer />
      <Carrito />
    </div>
  )
}

export default Inicio