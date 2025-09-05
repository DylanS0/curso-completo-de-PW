import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Tendencias from "./pages/Tendencias"
import Inicio from "./pages/Inicio"
import Reciente from "./pages/Reciente"



const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>

          <Route path='/inicio' element={<Inicio />} />
          <Route path='/tendencias' element={<Tendencias />} />
          <Route path='/reciente' element={<Reciente />} />

        </Routes>
        <Footer />
      </div>
    </BrowserRouter>



  )
}

export default App