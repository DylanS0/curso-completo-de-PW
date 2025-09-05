import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API = 'http://localhost:8080/api/estadisticas/top-avg';

const Top5avg = () => {
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
      setDatos(data);
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
    <section className="">
      <div className="container">
        <h2 className="text-center py-5">🏆 Top 5 en AVG</h2>
        <div className="row justify-content-center">
          <div className="card col-lg-8">
            <div className="table-responsive">
              <table className="table table-dark table-hover align-middle">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Jugador</th>
                    <th>Lugar de Nacimiento</th>
                    <th>AVG</th>
                  </tr>
                </thead>
                <tbody>
                  {datos.slice(0, 5).map((item,index) => (
                    <>
                      <tr>
                        <td><span className="badge bg-warning text-dark">{index+1}</span></td>
                        <td><strong>{item.nombre}</strong></td>
                        <td>{item.lugar_nacimiento}</td>
                        <td>{item.promedio_bateo*1000}</td>
                      </tr>
     
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            
          </div>
          <div className="text-center my-3">
              <Link to={'/estadisticas'} href="#" className="btn btn-outline-success">Ver todos los rankings</Link>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Top5avg