import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from './pages/Inicio'
import Checkout from './pages/Checkout'
import Catalogo from './pages/Catalogo'
import FAQ from './pages/FAQ'
import Entregas from './pages/Entregas'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/entregas" element={<Entregas />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App