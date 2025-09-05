import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const API = 'https://api.themoviedb.org/3/trending/movie/day?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE'; //tendencias cine

const Inicio = () => {
  /* const [datos, setDatos] = useState([]);
  const getDatos = async () => {
    
    try {
      const response = await fetch(APIPelTendenciasCine);
      const data = await response.json();
      //console.log(data);
      setDatos(data.results);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getDatos();
     }, []);
  let tipo="cine";
  const ruta = "https://image.tmdb.org/t/p/w500";
  const rutaDetalle="/detalle/" */



    return (
    <div>inicio</div>
  )
  }

export default Inicio