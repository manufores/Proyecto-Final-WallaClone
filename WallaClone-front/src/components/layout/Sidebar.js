import React from 'react';
import NuevoAnuncio from '../anuncios/NuevoAnuncio';


const Sidebar = () => {
    return ( 
        <aside>
            <h1>Walla<span>Clone</span></h1>

            <NuevoAnuncio />

            {/* <div className="proyectos">
                <h2>Tus Proyectos</h2>
                <ListadoProyectos />
            </div> */}
        </aside>
     );
}
 
export default Sidebar;