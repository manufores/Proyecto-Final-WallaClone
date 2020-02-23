import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const ResetPass = (props) => {

    // extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, emailsended, resetearPass, solicitudReset } = authContext;

      // En caso de que el password o usuario no exista
      useEffect(() => {
        if(emailsended) {
            props.history.push('/login');
            solicitudReset();

        }

        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    }, [mensaje, emailsended, props.history]);

    // State para iniciar sesión
    const [usuario, guardarUsuario] = useState({
        email: '',
    });

    // extraer de usuario
    const { email } = usuario;

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    // Cuando el usuario quiere iniciar sesión
    const onSubmit = e => {
        e.preventDefault();

        // Validar que no haya campos vacios
        if(email.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        }

        // Pasarlo al action
        resetearPass({ email });
    }



    return ( 
        <div className="form-usuario">
            { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> )  : null }

            <div className="contenedor-form sombra-dark">
                <h1>Resetear el Password</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Enviar" />
                    </div>
                </form>

                <Link to={'/login'} className="enlace-cuenta">
                    Login
                </Link>
            </div>
        </div>
     );
}
 
export default ResetPass;