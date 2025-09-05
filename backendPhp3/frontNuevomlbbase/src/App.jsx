
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Inicio from './pages/Inicio';
import Footer from './components/Footer';
import Jugadores from './pages/Jugadores';
import Detalle from './pages/Detalle';

const App = () => {
  const [darkMode, setDarkMode] = useState('dark');
  
  const toggleTheme = () => {
    setDarkMode(!darkMode)
    document.body.setAttribute('data-bs-theme', !darkMode ? 'dark' : 'light')
  }
  return (
    <BrowserRouter>
      <div className="app">
         <Header darkMode={darkMode} toggleTheme={toggleTheme} />
         <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/jugadores" element={<Jugadores />} />
           <Route path="/detalle/:id/:nom" element={<Detalle />} />
         

          <Route path="*" element={<Inicio />} />

         </Routes>

        <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App