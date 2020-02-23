import React from 'react';



const Anuncio = ({anuncio}) => {
    const url_img = process.env.REACT_APP_BACKEND_URL;
    // Obtener el state de anuncios


    return ( 

       <div className="card">
        <img className="card-img" src={anuncio.foto ? `${url_img}/images/uploads/${anuncio.foto}`: 'https://bulma.io/images/placeholders/1280x960.png'}  alt={anuncio.nombre}></img>
        {/* <div className="card-img-overlay d-flex justify-content-end">
            <a href="#" className="card-link text-danger like">
            <i className="fas fa-heart"></i>
            </a>
        </div> */}
        <div className="card-body">
            <h4 className="card-title">{anuncio.nombre}</h4>
            <h6 className="card-subtitle mb-2 text-muted">{anuncio.venta ? "Está en venta" : "Se busca para comprar"}</h6>
            <p className="card-text">{anuncio.descripcion}</p>
            <div className="options d-flex flex-fill">
            </div>
            <div className="buy d-flex justify-content-between align-items-center">
            <div className="price text-success"><h5 className="mt-4">{anuncio.precio}</h5></div>
            <div>{anuncio.tags.map(tag => <span className="btn btn-danger mt-3" key={tag}>{tag}</span>)}</div>
            </div>
        </div>
        </div>






        // <li>
        //     <p>{anuncio.nombre} </p>
            
        //     <p>{anuncio.descripcion}</p>
        //     <p>{anuncio.precio} </p>
        //     <p>{anuncio.tags.map(tag => <span key={tag}>{tag}</span>)}</p>
        //     <p>{anuncio.venta ? "Está en venta" : "Se busca para comprar"}</p>

        //     <div className="container">
        //         <img src={anuncio.foto ? `${url_img}/images/uploads/${anuncio.foto}`: 'https://bulma.io/images/placeholders/1280x960.png'} className="image-thumbnail rounded float-left w-25" alt="Foto"></img>
        //     </div>
        // </li>
     );
}
 
export default Anuncio;