import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const API = 'https://api.themoviedb.org/3/trending/movie/day?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE'; //tendencias cine



const Tendencias = () => {

  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDatos = async () => {
    try {
      const response = await fetch(API);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDatos(data.results);
      console.log(datos)
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getDatos();
  }, []);
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Cargando Personajes...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center py-5 text-danger">
        <h4>Error al cargar los Personajes</h4>
        <p>{error}</p>
      </div>
    );
  }
  return (
    <div className="container"> {/* hacer container al div */}
      <h3 className="text-center py-4"> </h3>
      <div className="row">
        {datos.map((item) => (
          <div className="col-md-4 col-xl-3 mb-3" key={item.id}>
            <div className="card h-100">
              <div className="card-header p-0">
                <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="" className="img-fluid"/>
              </div>
              <div className="card-body text-center">

              </div>



            </div>





          </div>

        ))}



      </div>
    </div>
  )
}

export default Tendencias