import { createContext, useContext, useState } from 'react'

const CarritoContext = createContext()

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([])

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id)
      if (existe) {
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        )
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
  }

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id))
  }

  const totalPrecio = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0)

  return (
    <CarritoContext.Provider value={{ carrito, setCarrito, agregarAlCarrito, eliminarDelCarrito, totalPrecio }}>
      {children}
    </CarritoContext.Provider>
  )
}

export function useCarrito() {
  return useContext(CarritoContext)
}