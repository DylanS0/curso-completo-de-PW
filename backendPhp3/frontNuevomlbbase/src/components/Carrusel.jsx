
import { Link } from 'react-router-dom';
import b1 from '../assets/b1.jpg';  // José Altuve
import b2 from '../assets/b2.jpg';  // Miguel Cabrera
import b3 from '../assets/b3.jpg';  // Ronald Acuña Jr.
import b4 from '../assets/b4.jpg';  // Luis Arraez

const Carrusel = () => {
  return (
    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1" />
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2" />
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3" />
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4" />
      </div>

      <div className="carousel-inner">
        
        {/* Slide 1: José Altuve */}
        <div className="carousel-item active">
          <img src={b1} className="d-block w-100" alt="José Altuve - El corazón de los Astros" />
          <div className="carousel-caption d-none d-md-block">
            <div style={{
              backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))',
              padding: '2rem',
              borderRadius: '8px',
              display: 'inline-block',
              textAlign: 'center'
            }}>
              <h1 className="display-4 fw-bold text-white">⚡ José Altuve</h1>
              <p className="lead mb-4 text-white">
                Pequeño de estatura, gigante de corazón. MVP, campeón del mundo y orgullo de Venezuela.
              </p>
              <Link to="/jugadores" className="btn btn-outline-light btn-lg me-3">Conoce a más leyendas</Link>
              <Link to="/estadisticas" className="btn btn-warning btn-lg">Top WAR Venezolanos</Link>
            </div>
          </div>
        </div>

        {/* Slide 2: Miguel Cabrera */}
        <div className="carousel-item">
          <img src={b2} className="d-block w-100" alt="Miguel Cabrera - El Inmortal" />
          <div className="carousel-caption d-none d-md-block">
            <div style={{
              backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))',
              padding: '2rem',
              borderRadius: '8px',
              display: 'inline-block',
              textAlign: 'center'
            }}>
              <h1 className="display-4 fw-bold text-white">👑 Miguel Cabrera</h1>
              <p className="lead mb-4 text-white">
                3000 hits, 500 HR, MVP, Triple Corona... Un inmortal del béisbol mundial.
              </p>
              <Link to="/jugadores" className="btn btn-outline-light btn-lg me-3">Ver todos los peloteros</Link>
              <Link to="/estadisticas/top-war" className="btn btn-danger btn-lg">Top 10 WAR</Link>
            </div>
          </div>
        </div>

        {/* Slide 3: Ronald Acuña Jr. */}
        <div className="carousel-item">
          <img src={b3} className="d-block w-100" alt="Ronald Acuña Jr. - El Futuro es Ahora" />
          <div className="carousel-caption d-none d-md-block">
            <div style={{
              backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))',
              padding: '2rem',
              borderRadius: '8px',
              display: 'inline-block',
              textAlign: 'center'
            }}>
              <h1 className="display-4 fw-bold text-white">🚀 Ronald Acuña Jr.</h1>
              <p className="lead mb-4 text-white">
                Velocidad, poder, clase. El rostro joven del béisbol venezolano en el MLB.
              </p>
              <Link to="/jugadores" className="btn btn-outline-light btn-lg me-3">Descubre más talento</Link>
              <Link to="/estadisticas/top-sb" className="btn btn-success btn-lg">Top Bases Robadas</Link>
            </div>
          </div>
        </div>

        {/* Slide 4: Luis Arraez */}
        <div className="carousel-item">
          <img src={b4} className="d-block w-100" alt="Luis Arraez - El Rey del Contacto" />
          <div className="carousel-caption d-none d-md-block">
            <div style={{
              backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))',
              padding: '2rem',
              borderRadius: '8px',
              display: 'inline-block',
              textAlign: 'center'
            }}>
              <h1 className="display-4 fw-bold text-white">🎯 Luis Arraez</h1>
              <p className="lead mb-4 text-white">
                3 veces .300+, líder en promedio. El mejor bateador de contacto de Venezuela.
              </p>
              <Link to="/jugadores" className="btn btn-outline-light btn-lg me-3">Ver todos los jugadores</Link>
              <Link to="/estadisticas/top-avg" className="btn btn-info btn-lg">Top Promedio Bateo</Link>
            </div>
          </div>
        </div>

      </div>

      {/* Controles */}
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
};

export default Carrusel;