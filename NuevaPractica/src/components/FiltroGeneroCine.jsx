import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const APIPelPopularesCine   ='https://api.themoviedb.org/3/genre/movie/list?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE';
const ruta="/categorias/";
const tipo="/cine";
const FiltroGenerosCine = () => {
    const [datos, setDatos] = useState([])
    const getDatos = async () =>{
        try {
          const response = await fetch(APIPelPopularesCine);
          const data = await response.json();
         // console.log(data)
          setDatos(data.genres);
        } catch (error) {
          console.error(error)
        }
      };
      useEffect(()=>{
        getDatos();
      },[]);
  return (
    <>
    {datos && datos.map((item) => (
        <li key={item.id}><Link to={ruta + item.id + tipo} className="dropdown-item" href="#">{item.name}</Link></li>
    ))}
    </>
  )
}

export default FiltroGenerosCine