import { createContext, useContext, useState } from 'react'

const CarritoContext = createContext()

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([])
  const [abierto, setAbierto] = useState(false)

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

  const quitarProducto = (id) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id))
  }

  const cambiarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      quitarProducto(id)
    } else {
      setCarrito((prev) =>
        prev.map((p) => p.id === id ? { ...p, cantidad: nuevaCantidad } : p)
      )
    }
  }

  const totalPrecio = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0)
  const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0)

  return (
    <CarritoContext.Provider value={{
      carrito, setCarrito,
      abierto, setAbierto,
      agregarAlCarrito,
      quitarProducto,
      cambiarCantidad,
      totalPrecio,
      totalItems
    }}>
      {children}
    </CarritoContext.Provider>
  )
}

export function useCarrito() {
  return useContext(CarritoContext)
}