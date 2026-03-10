import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from './pages/Inicio'
import Checkout from './pages/Checkout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App