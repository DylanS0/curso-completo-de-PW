import Carrusel from "../components/Carrusel"
import Destacados from "./inicio/Destacados"
import Top5avg from "./inicio/Top5avg"
import Top5war from "./inicio/Top5War"



const Inicio = () => {
  return (
    <div className="bg-pagina">
        <Carrusel/>
        <Destacados/>
        <Top5avg/>
        <Top5war/>
    </div>
  )
}

export default Inicio