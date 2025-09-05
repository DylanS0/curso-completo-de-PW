import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API = 'http://localhost:8080/api/jugadores/';
const IMAGE_BASE_URL = 'https://api.arsistemamlb.com/uploads/jugadores/';

const Detalle = () => {
  const { id } = useParams(); // Solo necesitas id para la API
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const URI = API + id;

  const getDatos = async () => {
    try {
      const response = await fetch(URI);
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
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Cargando jugador...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5 text-danger">
        <h4>Error al cargar el jugador</h4>
        <p>{error}</p>
      </div>
    );
  }

  if (!datos) {
    return (
      <div className="text-center py-5">
        <p>No se encontró información del jugador.</p>
      </div>
    );
  }

  // Ruta de la imagen: usa el id del jugador o un campo si viene en los datos
  // Suponiendo que la imagen sigue el patrón: ID.jpg
  const imagenUrl = `${IMAGE_BASE_URL}${id}.jpg`;

  return (
    <div className='bg-pagina'>


    <div className="container my-5">
      <div className="row">
        {/* Imagen */}
        <div className="col-md-4 text-center">
          <img
            src={imagenUrl}
            alt={datos.nombre}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/200x250?text=Sin+Imagen';
            }}
            className="img-fluid rounded mb-3"
            style={{ maxHeight: '300px', objectFit: 'cover' }}
          />
          <h5>{datos.nombre}</h5>
          <p className="text-muted">
            {datos.pos} | {datos.lugar_nacimiento} | {new Date(datos.fecha_nacimiento).getFullYear()}
          </p>
        </div>

        {/* Información principal */}
        <div className="col-md-8">
          <h2>{datos.nombre}</h2>
          <p className="lead">{datos.biografia}</p>

          <h4>Estadísticas de Carrera</h4>
          <table className="table table-striped">
            <tbody>
              <tr>
                <th>Posición</th>
                <td>{datos.pos}</td>
              </tr>
              <tr>
                <th>Años en MLB</th>
                <td>{datos.años_en_mlb}</td>
              </tr>
              <tr>
                <th>Año de Debut / Retiro</th>
                <td>{datos.año_debut} – {datos.año_retiro}</td>
              </tr>
              <tr>
                <th>Partidos Jugados</th>
                <td>{datos.partidos_jugados.toLocaleString()}</td>
              </tr>
              <tr>
                <th>Turnos al Bate</th>
                <td>{datos.turnos_bateo.toLocaleString()}</td>
              </tr>
              <tr>
                <th>Hits</th>
                <td>{datos.hits.toLocaleString()}</td>
              </tr>
              <tr>
                <th>Dobles / Triples</th>
                <td>{datos.dobles} / {datos.triples}</td>
              </tr>
              <tr>
                <th>Home Runs</th>
                <td>{datos.home_runs}</td>
              </tr>
              <tr>
                <th>Carreras Impulsadas (RBI)</th>
                <td>{datos.carreras_impulsadas.toLocaleString()}</td>
              </tr>
              <tr>
                <th>Base por Bola</th>
                <td>{datos.bases_por_bola.toLocaleString()}</td>
              </tr>
              <tr>
                <th>Ponches</th>
                <td>{datos.ponches.toLocaleString()}</td>
              </tr>
              <tr>
                <th>Promedio de Bateo</th>
                <td>{datos.promedio_bateo}</td>
              </tr>
              <tr>
                <th>Porcentaje de Enbase (OBP)</th>
                <td>{datos.porcentaje_embase}</td>
              </tr>
              <tr>
                <th>Porcentaje de Slugging (SLG)</th>
                <td>{datos.porcentaje_slugging}</td>
              </tr>
              <tr>
                <th>OPS</th>
                <td>{datos.ops}</td>
              </tr>
              <tr>
                <th>WAR (Wins Above Replacement)</th>
                <td>{datos.war}</td>
              </tr>
              <tr>
                <th>All-Star Appearances</th>
                <td>{datos.all_star_appearances}</td>
              </tr>
              <tr>
                <th>Robos de Base</th>
                <td>{datos.bases_robadas} (atrapado {datos.atrapado_robando} veces)</td>
              </tr>
            </tbody>
          </table>

          {/* Anécdotas */}
          {datos.anecdotas && (
            <div className="mt-4">
              <h5>🔍 Anécdota interesante</h5>
              <blockquote className="blockquote">
                <p>{datos.anecdotas}</p>
              </blockquote>
            </div>
          )}
        </div>
      </div>
    </div>
    
    </div>
  );
};

export default Detalle;