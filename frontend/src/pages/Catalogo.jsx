import Productos from '../components/Productos'
import Navbar from '../components/Navbar'
import Carrito from '../components/Carrito'

function Catalogo() {
  return (
    <div>
      <Navbar />
      <div className="pt-20">
        <Productos />
      </div>
      <Carrito />
    </div>
  )
}

export default Catalogo