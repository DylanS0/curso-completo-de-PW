import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Inicio from './pages/Inicio'
import Header from './Components/Header'
import Footer from './Components/Footer'

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Inicio/>} />

      </Routes>
      <Footer />

    </BrowserRouter>



  )
}

export default App