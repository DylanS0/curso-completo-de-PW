
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
  return (
    <BrowserRouter>
     <div className="app">
    <Header/>

    <Footer/>
    </div>
    </BrowserRouter>
  )
}

export default App