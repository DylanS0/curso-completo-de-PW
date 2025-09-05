import { Link } from "react-router-dom"


const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-menu shadow ">
    <div className="container">
      <a className="navbar-brand d-flex align-items-center" href="/">
        <span className="me-2"><img src="images/venezuela.jpg" alt="" width={50} /></span>
        MLB Venezuela
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto fs-6">
          <li className="nav-item"><Link to={'/inicio'} className="nav-link" href="/">Inicio</Link></li>
          <li className="nav-item"><Link to={'/jugadores'} className="nav-link" href="/jugadores">Jugadores</Link></li>
          <li className="nav-item"><Link to={'/estadisticas'} className="nav-link" href="/estadisticas">Estadísticas</Link></li>
          <li className="nav-item"><Link to={'/comparador'} className="nav-link" href="/comparador">Comparador</Link></li>
          <li className="nav-item"><Link to={'/mapa'} className="nav-link" href="/mapa">Mapa</Link></li>
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Header