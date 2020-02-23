import React, { Fragment, useState, useContext, useEffect } from 'react';
import anuncioContext from '../../context/anuncios/anuncioContext';
import AlertaContext from '../../context/alertas/alertaContext';

const FormAnuncio = () => {

    // Obtener el state del formulario
    const anunciosContext = useContext(anuncioContext);
    const { mensaje, tags, anuncioseleccionado, actualizarAnuncio, formedit, cerrarFormularioEdit, errorformulario, mostrarError, obtenerTags } = anunciosContext;

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

    useEffect(() => {
    
        if (anuncioseleccionado !== null) {
          guardarAnuncio(anuncioseleccionado);
        } else {
          guardarAnuncio({
            nombre: '',
            descripcion:'',
            precio: 0,
            venta: true,
            tags: []
          });
        }
      }, [anuncioseleccionado]);
    


    // State para Proyecto
    const [anuncio, guardarAnuncio] = useState({
        nombre: '',
        descripcion:'',
        precio: 0,
        venta: true,
        tags: []
        
    });

    

    // Extraer atributos de anuncio
    const { nombre, descripcion, precio } = anuncio;


    // Lee los contenidos del input
    const onChangeAnuncio = e => {
        guardarAnuncio({
            ...anuncio,
            [e.target.name] : e.target.value,
        })
    }

    const onChangeTags = e => {
        if (anuncioseleccionado.tags.find(element => element === e.target.value)){
            guardarAnuncio({
                ...anuncio,
                tags: anuncio.tags.filter(element => element !== e.target.value)
            })
            
            return anuncio;
        }else{
            guardarAnuncio({
                ...anuncio,
                [e.target.name] : [...anuncio.tags, e.target.value]
            })
        }
    }

    const onClickVenta = e => {
        if (e.target.value !== "sell"){
            guardarAnuncio({
                ...anuncio,
                [e.target.name] : false,
            })
        }else{
            guardarAnuncio({
                ...anuncio,
                [e.target.name] : true,
            })
        };        
    }

    const onChangeVenta = e => {
        guardarAnuncio({
            ...anuncio,
            [e.target.name] : true,
        });
    }

    // Cuando el usuario envia un anuncio
    const onSubmitAnuncio = async e => {
        e.preventDefault();
        
        // Validar el anuncio
        if(nombre === '') {
            mostrarError();
            return;
        }

        // agregar al state
        await actualizarAnuncio(anuncio);
        

        
        // Reiniciar el form
        guardarAnuncio({
            nombre: '',
            descripcion:'',
            precio: 0,
            venta: true,
            tags: []
        })
        
        cerrarFormularioEdit();
    }

    

    

    

    return ( 
        <Fragment>
            

            { formedit ? 
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
                                <select name="tags" multiple className="form-control" id="tagsList" onChange={onChangeTags}>
                                    {(tags.map(tag => (<option  value={tag.tagName} key={tag.tagName} >{tag.tagName}</option>)))}
                                </select>
                            </div>
           

                            <input 
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="Editar Anuncio"
                            />

                        </form>
                ) : null }

            { errorformulario ? <p className="mensaje error">El nombre del Anuncio es obligatorio</p>  : null }
        </Fragment>
     );
}
 
export default FormAnuncio;