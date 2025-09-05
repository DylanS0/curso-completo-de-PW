import { Link } from 'react-router-dom';
const ruta = "https://image.tmdb.org/t/p/w500";

const CardPelis = () => {
  return (
    <>
      <div className='col-6 col-md-4 col-lg-3 col-xl-2 mb-4' key={item.id}>
        <div className='card h-100'>
          <div className='card-header p-0'> //card header
            <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="" className="img-fluid" />
          </div>
          <div className='card-body text-center'> //card body
            <h4 className='fs-2 text-info mb-3'>{item.title}</h4>
            <p className='fs-4'>
              Fecha: <span className="fw-semibold text-success rounded">{item.release_date}</span>
              Popularidad: <span className="fw-semibold text-success rounded">{item.vote_average}</span>
            </p>

          </div>
          <div className='card-footer'> //card footer
            <Link to={`/detalle/${item.id}/${item.title}`} href="#" className='btn btn-sm btn-outline-info'>Detalles</Link>
          </div>
        </div>
      </div>

    //modal

    </>


  )
}







export default CardPelis
{/* <div className="col-6 col-md-4 col-lg-3 col-xl-2 mb-4" key={pelicula.id}>
   <div className="card h-100">
     <div className="card-header p-0">
       <img src={ruta + pelicula.poster_path} className="img-fluid" alt="..." />
     </div>
     <div className="card-body text-center">
       <p>{pelicula.title || pelicula.name}</p>
       <p>Popularidad <span className="badge rounded-pill p-1 bg-danger "> {parseInt(pelicula.popularity)}</span></p>
     </div>
     <div className="card-footer text-center">
       <Link to={rutaDetalle + tipo + '/' + pelicula.id} className="btn btn-success btn-sm mx-1" >Detalle</Link>
     </div>
   </div>
 </div> */}