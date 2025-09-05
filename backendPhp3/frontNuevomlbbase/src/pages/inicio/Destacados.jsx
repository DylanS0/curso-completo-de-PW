import { useEffect, useState } from "react";

const API = 'http://localhost:8080/api/estadisticas/destacados';


const Destacados = () => {
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
            console.log(data)
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
        <section className="py-5">
            <div className="container">
                <h2 className="text-center mb-4">🌟 Destacados Nacionales</h2>
                <div className="row text-center d-flex justify-content-center">
                    {/* Card 1 */}
                    <div className="col-md-2 mb-4  ">
                        <div className="card bg-dark text-white h-100 border-0 shadow">

                            <div className="card-body d-flex flex-column justify-content-between">
                                <img
                                    src={`http://localhost:8080/uploads/jugadores/${datos.war_mas_alto.id}.jpg`}
                                    alt={datos.war_mas_alto.jugador}
                                    className="rounded img-thumbnail img-fluid"
                                    
                                    onError={(e) => {
                                        e.target.src = 'http://localhost:8080/uploads/jugadores/default.png';
                                    }}
                                />
                                <div className="display-5 text-warning">{datos.war_mas_alto.valor}</div>
                                <h5 className="card-title">WAR más alto</h5>
                                <p className="card-text text-muted">{datos.war_mas_alto.jugador}</p>
                                <span className="badge bg-secondary">{datos.war_mas_alto.ciudad}</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="col-md-2 mb-4">
                        <div className="card bg-dark text-white h-100 border-0 shadow">

                            <div className="card-body d-flex flex-column justify-content-between">
                                <img
                                    src={`http://localhost:8080/uploads/jugadores/${datos.mejor_avg.id}.jpg`}
                                    alt={datos.mejor_avg.jugador}
                                     className="rounded img-thumbnail img-fluid"
                                    onError={(e) => {
                                        e.target.src = 'http://localhost:8080/uploads/jugadores/default.png';
                                    }}
                                />
                                <div className="display-5 text-warning">{datos.mejor_avg.valor}</div>
                                <h5 className="card-title">Mejor AVG</h5>
                                <p className="card-text text-muted">{datos.mejor_avg.jugador}</p>
                                <span className="badge bg-secondary">{datos.mejor_avg.ciudad}</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="col-md-2 mb-4">
                        <div className="card bg-dark text-white h-100 border-0 shadow">

                            <div className="card-body d-flex flex-column justify-content-between">
                                <img
                                    src={`http://localhost:8080/uploads/jugadores/${datos.mas_all_star.id}.jpg`}
                                    alt={datos.mas_all_star.jugador}
                                      className="rounded img-thumbnail img-fluid"
                                    onError={(e) => {
                                        e.target.src = 'http://localhost:8080/uploads/jugadores/default.png';
                                    }}
                                />
                                <div className="display-5 text-warning">{datos.mas_all_star.valor}</div>
                                <h5 className="card-title">All-Star apariciones</h5>
                                <p className="card-text text-muted">{datos.mas_all_star.jugador}</p>
                                <span className="badge bg-secondary">{datos.mas_all_star.ciudad}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 mb-4">
                        <div className="card bg-dark text-white h-100 border-0 shadow">

                            <div className="card-body d-flex flex-column justify-content-between">
                                <img
                                    src={`http://localhost:8080/uploads/jugadores/${datos.lider_t3b.id}.jpg`}
                                    alt={datos.lider_t3b.jugador}
                                     className="rounded img-thumbnail img-fluid"
                                    onError={(e) => {
                                        e.target.src = 'http://localhost:8080/uploads/jugadores/default.png';
                                    }}
                                />
                                <div className="display-5 text-warning">{datos.lider_t3b.valor}</div>
                                <h5 className="card-title">Lider en OPS</h5>
                                <p className="card-text text-muted">{datos.lider_t3b.jugador}</p>
                                <span className="badge bg-secondary">{datos.lider_t3b.ciudad}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Destacados