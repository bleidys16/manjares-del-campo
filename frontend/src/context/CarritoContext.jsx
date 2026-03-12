cat > frontend/src/context/CarritoContext.jsx << 'EOF'
import { createContext, useContext, useState } from 'react'

const CarritoContext = createContext()

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([])
  const [abierto, setAbierto] = useState(false)

  const agregarProducto = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id)
      if (existe) {
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        )
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
    setAbierto(true)
  }

  const quitarProducto = (id) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id))
  }

  const cambiarCantidad = (id, cantidad) => {
    if (cantidad < 1) return quitarProducto(id)
    setCarrito((prev) =>
      prev.map((p) => (p.id === id ? { ...p, cantidad } : p))
    )
  }

  const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0)
  const totalPrecio = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0)

  return (
    <CarritoContext.Provider value={{
      carrito, setCarrito, abierto, setAbierto,
      agregarProducto, quitarProducto, cambiarCantidad,
      totalItems, totalPrecio
    }}>
      {children}
    </CarritoContext.Provider>
  )
}

export function useCarrito() {
  return useContext(CarritoContext)
}
EOF