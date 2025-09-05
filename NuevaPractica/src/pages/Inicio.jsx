import { Card } from 'react-bootstrap'
import CardPelis from '../components/CardPelis';
import { useState, useEffect } from 'react';
import Carrusel from '../components/Carrusel';

const Inicio = () => {
   const [datos, setDatos] = useState([]);
  const getDatos = async () => {
    try {
      const response = await fetch(APIPelTendenciasCine);
      const data = await response.json();
      //console.log(data);
      setDatos(data.results);
    } catch (error) {
      console.error();
    }
  };
  useEffect(() => {
    getDatos();
  }, []);

  return (
    <>
        <Carrusel/>
        <h3 className="text-center py-5 text-white">Inicio</h3>
        <div className="container">
          <div className="row">
          {datos && datos.map((item) => (
            <CardPelis key={item.id} item={item} tipo={movie} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Inicio