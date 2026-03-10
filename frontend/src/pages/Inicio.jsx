import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Categorias from '../components/Categorias'
import Productos from '../components/Productos'
import Nosotros from '../components/Nosotros'
import Footer from '../components/Footer'
import Carrito from '../components/Carrito'

function Inicio() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Categorias />
      <Productos />
      <Nosotros />
      <Footer />
      <Carrito />
    </div>
  )
}

export default Inicio