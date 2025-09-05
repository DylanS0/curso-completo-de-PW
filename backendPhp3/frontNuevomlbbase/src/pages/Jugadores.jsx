import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const API = 'http://localhost:8080/api/jugadores';

const Jugadores = () => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filteredJugadores, setFilteredJugadores] = useState([]);
    const [search, setSearch] = useState('');

    const [positionFilter, setPositionFilter] = useState('');


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

    useEffect(() => {
        //console.log(search)
        let filtered = datos;

        // Búsqueda por nombre
        /*
            if (search) {
                filtered = filtered.filter(j =>
                    j.nombre.toLowerCase().includes(search.toLowerCase())
                );
            }
        */
        if (search) {
            const normalizedSearch = search.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            filtered = filtered.filter(j => {
                const normalizedNombre = j.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                return normalizedNombre.includes(normalizedSearch);
            });
            filtered.sort((a, b) => (b.war || 0) - (a.war || 0));
        }

        // Filtro por posición (si tienes campo `posiciones` en tu DB)
        if (positionFilter) {
            filtered = filtered.filter(j =>
                j.pos && j.pos.includes(positionFilter)
            )
            filtered.sort((a, b) => (b.war || 0) - (a.war || 0));
        }

        setFilteredJugadores(filtered)

    }, [datos, search, positionFilter])

    const posiciones = [
        { value: 'SP', label: 'Lanzador (SP)  Pitcher' },
        { value: 'RP', label: 'Relevista (RP)  Pitcher' },
        { value: 'C', label: 'Receptor (C)  Catcher' },
        { value: '1B', label: 'Primera Base (1B)' },
        { value: '2B', label: 'Segunda Base (2B)' },
        { value: '3B', label: 'Tercera Base (3B)' },
        { value: 'SS', label: 'Campo Corto (SS)' },
        { value: 'LF', label: 'Jardinero Izquierdo (LF)' },
        { value: 'CF', label: 'Jardinero Central (CF)' },
        { value: 'RF', label: 'Jardinero Derecho (RF)' },
        { value: 'DH', label: 'Bateador Designado (DH) ' },
        { value: 'UTIL', label: 'Utilitid (UTIL) ' },
    ];

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
        <div className="bg-pagina py-4">
            <div className="container">
                <h3 className="text-center py-2">📋 Jugadores Venezolanos en el MLB</h3>
                <p className="text-center text-muted">
                    {datos.length} jugadores que han representado a la Vinotinto
                </p>
                <div className='row py-4'>
                    <div className='col-md-5'>
                        <input
                            type="text"
                            className='form-control'
                            placeholder='Burcar por nombre...'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className='col-md-5'>
                        <select
                            class="form-select"
                            value={positionFilter}
                            onChange={(e) => setPositionFilter(e.target.value)}
                        >
                            <option selected>Seleccione un aposición</option>
                            {posiciones.map((item, index) => (
                                <option key={index} value={item.value}>{item.label}</option>
                            ))}
                        </select>

                    </div>
                    <div className='col-md-2 d-grid'>
                        <button
                            className='btn btn-outline-success btn-sm'
                            onClick={() => { setSearch(''); setPositionFilter(''); }}
                        >
                            Limpiar
                        </button>
                    </div>
                </div>


                {filteredJugadores.length === 0 ? (
                    <div className="alert alert-info text-center">
                        No se encontraron jugadores con esos filtros.
                    </div>
                ) : (


                    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-4 ">
                        {filteredJugadores.map((item) => (
                            <div key={item.id} className='col slide-top mt-5'>
                                <div className='card h-100 '>
                                    <div className='card-header p-0'>
                                        <img
                                            src={`https://api.arsistemamlb.com/uploads/jugadores/${item.id}.jpg`}
                                            alt={item.nombre}
                                            className="card-img-top"
                                            onError={(e) => {
                                                e.target.src = 'https://api.arsistemamlb.com/uploads/jugadores/default.png';
                                            }}
                                        />
                                    </div>
                                    <div className='card-body text-center d-flex flex-column justify-content-between'>
                                        <p className='fw-bold'>{item.nombre}</p>
                                        {item.all_star_appearances > 0 && (
                                            <span className="badge bg-danger mb-2">
                                                ⭐ All-Star: {item.all_star_appearances}
                                            </span>
                                        )}
                                        <p><strong>WAR:</strong> {item.war || 'N/A'}<br />
                                            <strong>HR:</strong> {item.home_runs || 0}<br />
                                            <strong>AVG:</strong> {item.promedio_bateo ? `.${(item.promedio_bateo * 1000).toFixed(0)}` : 'N/A'}</p>



                                    </div>
                                    <div className='card-footer text-center'>
                                        <a className="btn btn-outline-success btn-sm me-2" data-bs-toggle="modal" data-bs-target={`#jug${item.id}`}>
                                            Perfil
                                        </a>

                                        <Link to={`/detalle/${item.id}/${item.nombre}`} href="#" className='btn btn-outline-danger btn-sm'>Detalle</Link>
                                    </div>



                                    <div className="modal fade" id={`jug${item.id}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-lg">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Informacion sobre el jugador</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                                </div>
                                                <div className="modal-body">
                                                    <div className='row'>
                                                        <div className='col-md-4'>
                                                            <img
                                                                src={`https://api.arsistemamlb.com/uploads/jugadores/${item.id}.jpg`}
                                                                alt={item.nombre}
                                                                className="card-img-top"
                                                                onError={(e) => {
                                                                    e.target.src = 'https://api.arsistemamlb.com/uploads/jugadores/default.png';
                                                                }}
                                                            />
                                                        </div>
                                                        <div className='col-md-8'>
                                                            <h3>{item.nombre} ({item.pos})</h3>
                                                            <p><b>Debut: </b>{item.año_debut} / <b>Retiro: </b>{item.año_retiro} / <b>Años en MLB: </b> {item.años_en_mlb} <br />
                                                            <b>Partidos jugados: </b>{item.partidos_jugados} / <b>Turnos al bate: </b>{item.turnos_bateo}</p>                                                            
                                                            
                                                            
                                                            
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-danger btn-sm me-2" data-bs-dismiss="modal">Cerrar</button>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>










                                </div>
                            </div>

                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Jugadores