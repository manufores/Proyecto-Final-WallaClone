import React, { Fragment, useState, useContext, useEffect } from 'react';
import anuncioContext from '../../context/anuncios/anuncioContext';
import busquedaContext from '../../context/busqueda/busquedaContext';
import AlertaContext from '../../context/alertas/alertaContext';

const FormBusqueda = () => {

    // Obtener el state del formulario
    const anunciosContext = useContext(anuncioContext);
    const {  tags,  obtenerTags, errorformulario, mensaje } = anunciosContext;

    const busquedasContext = useContext(busquedaContext);
    const {  obtenerBusqueda, formulario_busqueda} = busquedasContext;

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;


    // Obtener anuncios cuando carga el componente
    useEffect(() => {
        // si hay un error
        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        obtenerTags();
        // eslint-disable-next-line
    }, [mensaje]);

    


    // State para Proyecto
    
    const [busqueda, guardarBusqueda] = useState({
        nombre: '',
        descripcion:'',
        precio: '',
        venta: true,
        tagsB: []
        
    });

    

    // Extraer atributos de proyecto
    const { nombre, descripcion, precio, tagsB } = busqueda;


    // Lee los contenidos del input
    const onChangeAnuncio = e => {
        console.log(busqueda);
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value,
        })
    }

    const onChangeTags = e => {
        console.log(busqueda);
        if (tagsB.find(element => element === e.target.value)){
            guardarBusqueda({
                ...busqueda,
                tagsB: tagsB.filter(element => element !== e.target.value)
            })
        }else{
            guardarBusqueda({
                ...busqueda,
                [e.target.name] : [...busqueda.tagsB, e.target.value]
            })
        }
    }

    const onChangeVenta = e => {
        console.log(e.target.value);
        if (e.target.value !== "sell"){
            guardarBusqueda({
                ...busqueda,
                [e.target.name] : false,
            })
        }else{
            guardarBusqueda({
                ...busqueda,
                [e.target.name] : true,
            })
        };        
    }

    const onClickVenta = e => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : true,
        });
    }

    // Cuando el usuario envia un anuncio
    const onSubmitAnuncio = async e => {
        e.preventDefault();

        
        obtenerBusqueda(
            `nombre=${nombre}&&descripcion=${descripcion}&&precio=${precio}&&tags=${tagsB}`
        );

        
        // Reiniciar el form
        guardarBusqueda({
            nombre: '',
            descripcion:'',
            precio: '',
            venta: true,
            tagsB: []
        })
        
    }

    

    

    

    return ( 
        <Fragment>
            

            { formulario_busqueda ? 
                    (
                        <form
                            className="formulario-nuevo-proyecto"
                            onSubmit={onSubmitAnuncio}
                        >
                            <input 
                                type="text"
                                className="input-text"
                                placeholder="Título del anuncio"
                                name="nombre"
                                value={nombre}
                                onChange={onChangeAnuncio}
                            />
                            <textarea 
                                type="text"
                                className="input-text"
                                placeholder="Describe el anuncio"
                                name="descripcion"
                                value={descripcion}
                                onChange={onChangeAnuncio}
                            />

                                <input 
                                    type="text"
                                    className="input-text"
                                    placeholder="Precio"
                                    name="precio"
                                    value={precio}
                                    onChange={onChangeAnuncio}
                            />

                            <div className="form-group">
                                <label htmlFor="buyOrSell">¿Vendes o compras?</label>
                                <select name="venta" className="form-control" id="buyOrSell" onChange={onChangeVenta} onClick={onClickVenta}>
                                    <option value="sell" >Venta</option>
                                    <option value="buy" >Compra</option>
                                </select>
                            </div>

                            { alerta   ? ( <div className={`alerta ${alerta.categoria} `}>{alerta.msg}</div>  ) : null  }

                            <div className="form-group">
                                <label htmlFor="tagsList">Selecciona tags</label>
                                <select name="tagsB" className="form-control" id="tagsList" onChange={onChangeTags}>
                                    <option>Escoge una o varias opciones</option>
                                    {(tags.map(tag => (<option  value={tag.tagName} key={tag.tagName} >{tag.tagName}</option>)))}
                                </select>
                            </div>
           

                            <input 
                                type="submit"
                                className="btn btn-primary mb-2"
                                value="Buscar"
                            />

                        </form>
                ) : null }

            { errorformulario ? <p className="mensaje error">El nombre del Anuncio es obligatorio</p>  : null }
        </Fragment>
     );
}
 
export default FormBusqueda;