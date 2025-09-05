

const Inicio = () => {
    return (
        <div>
         
            
            <section id="destacados" className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-5 text-dark">Nuestras Leyendas</h2>
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        <div className="col">
                            <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
                                <img src="https://via.placeholder.com/400x300/e9ecef/212529?text=Jugador+1" className="card-img-top" alt="Jugador 1" />
                                <div className="card-body">
                                    <h5 className="card-title text-center fw-bold">Miguel Cabrera</h5>
                                    <p className="card-text text-muted text-center">Una leyenda viviente, "El Tigre Mayor". Salón de la Fama.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
                                <img src="https://via.placeholder.com/400x300/e9ecef/212529?text=Jugador+2" className="card-img-top" alt="Jugador 2" />
                                <div className="card-body">
                                    <h5 className="card-title text-center fw-bold">Omar Vizquel</h5>
                                    <p className="card-text text-muted text-center">Uno de los mejores campocortos defensivos de todos los tiempos.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
                                <img src="https://via.placeholder.com/400x300/e9ecef/212529?text=Jugador+3" className="card-img-top" alt="Jugador 3" />
                                <div className="card-body">
                                    <h5 className="card-title text-center fw-bold">José Altuve</h5>
                                    <p className="card-text text-muted text-center">Un gigante del deporte, MVP y campeón de la Serie Mundial.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="galeria" className="py-5">
                <div className="container">
                    <h2 className="text-center mb-5">Momentos Inolvidables</h2>
                    <div className="row g-4">
                        <div className="col-sm-6 col-md-4 col-lg-3">
                            <div className="card shadow-sm border-0">
                                <img src="https://via.placeholder.com/400x400/212529/e9ecef?text=Foto+1" className="card-img-top" alt="Foto de Béisbol 1" />
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                            <div className="card shadow-sm border-0">
                                <img src="https://via.placeholder.com/400x400/212529/e9ecef?text=Foto+2" className="card-img-top" alt="Foto de Béisbol 2" />
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                            <div className="card shadow-sm border-0">
                                <img src="https://via.placeholder.com/400x400/212529/e9ecef?text=Foto+3" className="card-img-top" alt="Foto de Béisbol 3" />
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                            <div className="card shadow-sm border-0">
                                <img src="https://via.placeholder.com/400x400/212529/e9ecef?text=Foto+4" className="card-img-top" alt="Foto de Béisbol 4" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default Inicio