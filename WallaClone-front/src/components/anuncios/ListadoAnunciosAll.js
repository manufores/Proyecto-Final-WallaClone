import React, { useContext, useEffect } from "react";
import Anuncio from "./Anuncio";
import anuncioContext from "../../context/anuncios/anuncioContext";
import busquedaContext from "../../context/busqueda/busquedaContext";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import BarraLayoutPrincipal from "../layout/BarraLayoutPrincipal";
import FormBusqueda from "../../components/anuncios/FormBusqueda";

const ListadoAnuncios = () => {
  // Extrar anuncios de state inicial
  const anunciosContext = useContext(anuncioContext);
  const { mensaje, anuncios, obtenerAnunciosAll } = anunciosContext;

  const busquedasContext = useContext(busquedaContext);
  const { anunciosbuscados, formulario_busqueda } = busquedasContext;

  // Obtener anuncios cuando carga el componente
  useEffect(() => {
    obtenerAnunciosAll();
    // eslint-disable-next-line
  }, [mensaje]);

  return (
    <main className="contenedor-proyecto">
      <BarraLayoutPrincipal />
      <FormBusqueda />

      <ul className="listado-tareas">
        {formulario_busqueda ? (
          anunciosbuscados.length === 0 ? (
            <li className="tarea">
              <p>No se han encontrado anuncios</p>
            </li>
          ) : (
            <TransitionGroup>
              {anunciosbuscados.map(anuncio => (
                <CSSTransition
                  key={anuncio._id}
                  timeout={200}
                  className="proyecto"
                >
                  <li className="tarea sombra">
                    <Anuncio anuncio={anuncio} />
                  </li>
                </CSSTransition>
              ))}
            </TransitionGroup>
          )
        ) : anuncios.length === 0 ? (
          <li className="tarea">
            <p>No hay Anuncios</p>
          </li>
        ) : (
          <TransitionGroup>
            {anuncios.map(anuncio => (
              <CSSTransition
                key={anuncio._id}
                timeout={200}
                className="proyecto"
              >
                <li className="tarea sombra">
                  <Anuncio anuncio={anuncio} />
                </li>
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
    </main>
  );
};

export default ListadoAnuncios;
