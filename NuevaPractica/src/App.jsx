import { BrowserRouter, Route, Routes } from "react-router-dom"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Inicio from "./pages/Inicio"
import Tendencias from "./pages/Tendencias"
import Categorias from "./pages/Categorias"
import Detalles from "./pages/Detalles"
import Peliculas from "./pages/Peliculas"

const App = () => {
  return (

    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Inicio/>}/>
      <Route path="/inicio" element={<Inicio/>}/>
      <Route path="/tendencias" element={<Tendencias/>}/>
      <Route path="/categorias/:id/:tipo" element={<Categorias/>}/>
      <Route path="/detalles" element={<Detalles/>}/>
      <Route path="peliculas" element={<Peliculas/>}/>
      <Route path="*" element={<Inicio/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>

  )
}

export default App