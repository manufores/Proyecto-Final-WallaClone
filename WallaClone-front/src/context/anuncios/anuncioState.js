import React, { useReducer } from 'react';

import anuncioContext from './anuncioContext';
import anuncioReducer from './anuncioReducer';
import { 
    FORMULARIO_ANUNCIO, 
    FORMULARIO_EDICION,
    FORMULARIO_CERRAR_EDICION,
    OBTENER_ANUNCIOS,
    OBTENER_TAGS,
    AGREGAR_ANUNCIO,
    ANUNCIO_ERROR,
    VALIDAR_FORMULARIO,
    ANUNCIO_ACTUAL,
    ELIMINAR_ANUNCIO,
    ANUNCIO_SELECTED,
    ACTUALIZAR_ANUNCIO
} from '../../types';

import clienteAxios from '../../config/axios';


const AnuncioState = props => {

    const initialState = {
        anuncios : [],
        tags : [],
        formulario : false,
        formedit : false,
        errorformulario: false,
        anuncio: null, 
        mensaje: null,
        anuncioseleccionado: null,
        formData: null

    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(anuncioReducer, initialState)

    // Serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_ANUNCIO
        })
    }

    const mostrarFormularioEdit = () => {
        dispatch({
            type: FORMULARIO_EDICION
        })
    }

    const cerrarFormularioEdit = () => {
        dispatch({
            type: FORMULARIO_CERRAR_EDICION
        })
    }

    // Obtener todos los anuncios sin estar autenticado
    const obtenerAnunciosAll = async () => {
        try {
            const resultado = await clienteAxios.get('/api/anunciosall');

            dispatch({
                type: OBTENER_ANUNCIOS,
                payload: resultado.data.anuncios
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            
            dispatch({
                type: ANUNCIO_ERROR,
                payload: alerta
            })
        }
    }

    // Obtener los anuncios
    const obtenerAnuncios = async () => {
        try {
            const resultado = await clienteAxios.get('/api/anuncios');

            dispatch({
                type: OBTENER_ANUNCIOS,
                payload: resultado.data.anuncios
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            
            dispatch({
                type: ANUNCIO_ERROR,
                payload: alerta
            })
        }
    }

    const obtenerTags = async () => {
        try {
            const resultado = await clienteAxios.get('/api/tags');

            dispatch({
                type: OBTENER_TAGS,
                payload: resultado.data.tags
            })

        } catch (error) {
            const alerta = {
                msg: 'Hubo un error con los tags',
                categoria: 'alerta-error'
            }
            dispatch({
                type: ANUNCIO_ERROR,
                payload: alerta
            })
        }
    }

   

    // Agregar nuevo anuncio
    const agregarAnuncio = async (fd) => {

        try {
            
            const resultado = await clienteAxios.post('/api/anuncios', fd, {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            });
            // Insertar el anuncio en el state
            dispatch({
                type: AGREGAR_ANUNCIO,
                payload: resultado.data
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            
            dispatch({
                type: ANUNCIO_ERROR,
                payload: alerta
            })
        }
    }

    // Valida el formulario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    } 

    // Selecciona el Anuncio que el usuario dio click
    const anuncioActual = anuncioId => {
        dispatch({
            type: ANUNCIO_ACTUAL,
            payload: anuncioId
        })
    }

    const anuncioSelected = anuncio => {
        dispatch({
            type: ANUNCIO_SELECTED,
            payload: anuncio
        })
    }

    // Edita o modifica un anuncio
    const actualizarAnuncio = async (fd) => {

        try {
            const resultado = await clienteAxios.put(`/api/anuncios/${fd._id}`, fd);
            
            dispatch({
                type: ACTUALIZAR_ANUNCIO,
                payload: resultado.data.anuncio
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Elimina un proyecto
    const eliminarAnuncio = async anuncioId => {
        try {
            await clienteAxios.delete(`/api/anuncios/${anuncioId}`);
            dispatch({
                type: ELIMINAR_ANUNCIO,
                payload: anuncioId
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            
            dispatch({
                type: ANUNCIO_ERROR,
                payload: alerta
            })
        }
    }


    return (
        <anuncioContext.Provider
            value={{
                anuncios: state.anuncios,
                tags: state.tags,
                formulario: state.formulario,
                formedit: state.formedit,
                errorformulario: state.errorformulario,
                anuncio: state.anuncio,
                mensaje: state.mensaje,
                anuncioseleccionado: state.anuncioseleccionado,
                mostrarFormulario,
                mostrarFormularioEdit,
                cerrarFormularioEdit,
                obtenerAnunciosAll,
                obtenerAnuncios,
                obtenerTags,
                agregarAnuncio,
                mostrarError,
                anuncioActual,
                anuncioSelected,
                actualizarAnuncio,
                eliminarAnuncio
            }}
        >
            {props.children}
        </anuncioContext.Provider>
        
    )
}

export default AnuncioState;