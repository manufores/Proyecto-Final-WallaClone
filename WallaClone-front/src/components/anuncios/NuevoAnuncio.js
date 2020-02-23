import React, { Fragment, useState, useContext, useEffect } from 'react';
import anuncioContext from '../../context/anuncios/anuncioContext';
import AlertaContext from '../../context/alertas/alertaContext';

const NuevoAnuncio = () => {

    // Obtener el state del formulario
    const anunciosContext = useContext(anuncioContext);
    const { mensaje, tags, formulario, errorformulario,  mostrarFormulario, agregarAnuncio, mostrarError, obtenerTags } = anunciosContext;

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


    // State para Anuncio
    const [anuncio, guardarAnuncio] = useState({
        nombre: '',
        descripcion:'',
        precio: 0,
        venta: true,
        tagsP: []
        
    });

    const [image, setFile] = useState('');
    const [filename, setFilename] = useState('');

    // Extraer atributos de anuncio
    const { nombre, descripcion, precio, venta, tagsP } = anuncio;


    // Lee los contenidos del input
    const onChangeAnuncio = e => {
        guardarAnuncio({
            ...anuncio,
            [e.target.name] : e.target.value,
        })
    }

    const onChangeTags = e => {
        if (anuncio.tagsP.find(element => element === e.target.value)){
            return anuncio;
        }else{
            guardarAnuncio({
                ...anuncio,
                [e.target.name] : [...anuncio.tagsP, e.target.value]
            })
        }
    }

    const onChangeVenta = e => {
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

    // Cuando el usuario envia un anuncio
    const onSubmitAnuncio = async e => {
        e.preventDefault();

        const fd =  new FormData();
        fd.append('image', image);
        fd.append('nombre', nombre);
        fd.append('precio', precio);
        fd.append('descripcion', descripcion);
        fd.append('venta', venta)
        fd.append('tags', tagsP);

        // Validar el anuncio
        if(nombre === '') {
            mostrarError();
            return;
        }

        // agregar al state
        await agregarAnuncio(fd);
        

        
        // Reiniciar el form
        guardarAnuncio({
            nombre: '',
            descripcion:'',
            precio: 0,
            venta: true,
            tagsP: []
        })
        setFilename('');
    }

    // Mostrar el formulario
    const onClickFormulario = () => {
        mostrarFormulario();
    }

    //Handler para subir imagenes al back-end
    const fileSlectedHandler = e =>{
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name) ;
    }

    

    return ( 
        <Fragment>
            <button 
                type="button"
                className="btn btn-block btn-primario"
                onClick={ onClickFormulario }
            >Nuevo Anuncio</button>

            { formulario ? 
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
                                <select name="venta" className="form-control" id="buyOrSell" onChange={onChangeVenta}>
                                    <option value="sell" >Venta</option>
                                    <option value="buy" >Compra</option>
                                </select>
                            </div>

                            { alerta   ? ( <div className={`alerta ${alerta.categoria} `}>{alerta.msg}</div>  ) : null  }

                            <div className="form-group">
                                <label htmlFor="tagsList">Selecciona tags</label>
                                <select name="tagsP" className="form-control" id="tagsList" onChange={onChangeTags}>
                                    <option>Escoge un tag</option>
                                    {(tags.map(tag => (<option  value={tag.tagName} key={tag.tagName} >{tag.tagName}</option>)))}
                                </select>
                            </div>

                            <div className="custom-file">
                                <input type="file"
                                    className='custom-file-input'
                                    id='customFile'
                                    onChange={fileSlectedHandler} />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        {filename}
                                    </label>
                                </div>                         

                            <input 
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="Agregar Anuncio"
                            />

                        </form>
                ) : null }

            { errorformulario ? <p className="mensaje error">El nombre del Anuncio es obligatorio</p>  : null }
        </Fragment>
     );
}
 
export default NuevoAnuncio;