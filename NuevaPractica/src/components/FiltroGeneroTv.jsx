import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
const APIPelPopularesTv   ='https://api.themoviedb.org/3/genre/tv/list?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE';

const FiltroGeneroTv = () => {

    const [datos, setDatos] = useState([])
    const getDatos = async () =>{
        try {
          const response = await fetch(APIPelPopularesTv);
          const data = await response.json();
          console.log(data)
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
            <li key={item.id}><Link to={`/categorias/${item.id}/tv`  } className="dropdown-item" href="#">{item.name}</Link></li>
        ))}
    
    </>
  )
}

export default FiltroGeneroTv