import React, { useReducer } from "react";

import busquedaContext from "./busquedaContext";
import busquedaReducer from "./busquedaReducer";
import {
  FORMULARIO_BUSQUEDA,
  ANUNCIOS_BUSQUEDA,
  BUSQUEDA_ERROR
} from "../../types";

import clienteAxios from "../../config/axios";

const BusquedaState = props => {
  const initialState = {
    formulario_busqueda: false,
    anunciosbuscados: [],
    urlsearch: "",
    tags: []
  };

  // Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(busquedaReducer, initialState);

  const mostrarFormularioBusqueda = () => {
    dispatch({
      type: FORMULARIO_BUSQUEDA,
      payload: true
    });
  };

  const cerrarFormularioBusqueda = () => {
    dispatch({
      type: FORMULARIO_BUSQUEDA,
      payload: false
    });
  };

  const obtenerBusqueda = async urlsearch => {
    try {
      const endPoint = `/api/anunciosall/?${urlsearch}`;
      const resultado = await clienteAxios.get(endPoint);

      dispatch({
        type: ANUNCIOS_BUSQUEDA,
        payload: resultado.data.anuncios
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error"
      };

      dispatch({
        type: BUSQUEDA_ERROR,
        payload: alerta
      });
    }
  };

  return (
    <busquedaContext.Provider
      value={{
        formulario_busqueda: state.formulario_busqueda,
        anunciosbuscados: state.anunciosbuscados,
        urlsearch: state.urlsearch,
        tags: state.tags,
        mostrarFormularioBusqueda,
        cerrarFormularioBusqueda,
        obtenerBusqueda
      }}
    >
      {props.children}
    </busquedaContext.Provider>
  );
};

export default BusquedaState;
