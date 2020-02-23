import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';

import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION,
    RESETEAR_PASS,
    RESETEO_SOLICITADO,
    NEW_PASSWORD
} from '../../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null, 
        mensaje: null, 
        cargando: true,
        emailsended: null,
        resetpass: null
    }

    const [ state, dispatch ] = useReducer(AuthReducer, initialState);

    const registrarUsuario = async datos => {
        try {

            const respuesta = await clienteAxios.post('/api/usuarios', datos);

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            });

            // Obtener el usuario
            usuarioAutenticado();
        } catch (error) {
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    // Retorna el usuario autenticado
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if(token) {
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            });

        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    // Cuando el usuario inicia sesión
    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            });

            // Obtener el usuario
            usuarioAutenticado();
        } catch (error) {
            console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    const resetearPass = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/reset', datos);
            
            dispatch({
                type: RESETEAR_PASS,
                payload: respuesta.data
            });

            // Obtener el usuario
            // usuarioAutenticado();
        } catch (error) {
            console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    const solicitudReset = () => {
        dispatch({
            type: RESETEO_SOLICITADO,
        })
    }

    const newPassword = async (token, password) => {
        
        // const respuesta1 = await clienteAxios.get('/api/reset');
        const respuesta = await clienteAxios.post('/api/newpassword', token, password);
        
        
        if(respuesta.data === 'ok'){
            dispatch({
                type: NEW_PASSWORD
            })
        }
        
        
    }

    // Cierra la sesión del usuario
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                emailsended: state.emailsended,
                resetpass: state.resetpass,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                resetearPass,
                solicitudReset,
                newPassword,
                cerrarSesion
            }}
        >{props.children}

        </AuthContext.Provider>
    )
}
export default AuthState;
