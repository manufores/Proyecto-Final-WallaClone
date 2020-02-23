import React, { useContext, useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import FormAnuncio from './FormAnuncio';
import ListadoAnuncios from '../anuncios/ListadoAnuncios';
import AuthContext from '../../context/autenticacion/authContext';

const Anuncios = () => {

    // Extraer la información de autenticación
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, [])

    return ( 
        <div className="contenedor-app">
            <Sidebar />

            <div className="seccion-principal">
                <Barra />

                <main>
                    {/* <FormTarea /> */}
                    <FormAnuncio />

                    <div className="contenedor-tareas">
                        <ListadoAnuncios />
                    </div>
                </main>
            </div>
        </div>
     );
}
 
export default Anuncios;