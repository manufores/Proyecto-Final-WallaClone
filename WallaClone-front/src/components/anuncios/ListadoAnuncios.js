import React, { useContext, useEffect } from "react";
import Anuncio from "./Anuncio";
import anuncioContext from "../../context/anuncios/anuncioContext";
import AlertaContext from "../../context/alertas/alertaContext";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const ListadoAnuncios = () => {
  // Extrar anuncios de state inicial
  const anunciosContext = useContext(anuncioContext);
  const {
    mensaje,
    anuncios,
    obtenerAnuncios,
    eliminarAnuncio,
    anuncioSelected,
    mostrarFormularioEdit
  } = anunciosContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  // Obtener anuncios cuando carga el componente
  useEffect(() => {
    // si hay un error
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }

    obtenerAnuncios();
    // eslint-disable-next-line
  }, [mensaje]);

  const seleccionarAnuncio = anuncio => {
    mostrarFormularioEdit();
    // Fijar un proyecto actual
    anuncioSelected(anuncio);
  };

  // revisar si anuncios tiene contenido
  if (anuncios.length === 0)
    return <p>No hay anuncios, comienza creando uno</p>;

  return (
    <ul className="listado-proyectos">
      {alerta ? (
        <div className={`alerta ${alerta.categoria} `}>{alerta.msg}</div>
      ) : null}

      <TransitionGroup>
        {anuncios.map(anuncio => (
          <CSSTransition key={anuncio._id} timeout={200} classNames="proyecto">
            <li className="tarea sombra">
              <Anuncio anuncio={anuncio} />
              <div className="acciones">
                <button
                  type="button"
                  className="btn btn-primario"
                  onClick={() => seleccionarAnuncio(anuncio)}
                >
                  Editar
                </button>

                <button
                  type="button"
                  className="btn btn-secundario"
                  onClick={() => eliminarAnuncio(anuncio._id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListadoAnuncios;
