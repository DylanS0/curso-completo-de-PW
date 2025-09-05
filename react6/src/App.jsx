
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import Tendencias from './pages/Tendencias'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="" element={<Tendencias />} />
          <Route path="/tendencias" element={<Tendencias />} />
          <Route path="/tendencias/:tipo" element={<Tendencias />} />
          <Route path="*" element={<Tendencias />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App