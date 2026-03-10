import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Categorias from '../components/Categorias'
import Productos from '../components/Productos'
import Footer from '../components/Footer'

function Inicio() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Categorias />
      <Productos />
      <Footer />
    </div>
  )
}

export default Inicio