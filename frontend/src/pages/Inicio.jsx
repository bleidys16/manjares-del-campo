import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Categorias from '../components/Categorias'

function Inicio() {
  return (
    <div className="bg-green-50">
      <Navbar />
      <Hero />
      <Categorias />
    </div>
  )
}

export default Inicio