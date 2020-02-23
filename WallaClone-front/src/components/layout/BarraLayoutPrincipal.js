import React, { useContext } from "react";
import { Link } from "react-router-dom";
import i18n from "../../i18n";
import busquedaContext from "../../context/busqueda/busquedaContext";

const BarraLayoutPrincipal = () => {
  const busquedasContext = useContext(busquedaContext);
  const {
    mostrarFormularioBusqueda,
    cerrarFormularioBusqueda,
    formulario_busqueda
  } = busquedasContext;
  const onClickBuscar = e => {
    if (formulario_busqueda === false) {
      mostrarFormularioBusqueda();
    } else {
      cerrarFormularioBusqueda();
    }
  };

  return (
    <header className="app-header">
      <h1 className="nombre-usuario">
        Walla<span>Clone</span>
      </h1>
      <nav className="nav-principal">
        <a href="/?lng=en">English</a>
        <a href="/?lng=es">Español</a>
        <Link to={"/login"} className="enlace-cuenta">
          {i18n.t("login")}
        </Link>
        <button onClick={onClickBuscar}>
          {formulario_busqueda ? i18n.t("closebtn") : i18n.t("searchbtn")}
        </button>
      </nav>
    </header>
  );
};

export default BarraLayoutPrincipal;
