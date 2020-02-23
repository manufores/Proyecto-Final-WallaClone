import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import NuevaCuenta from "./components/auth/NuevaCuenta";
import ResetPass from "./components/auth/ResetPass";
import PassReseted from "./components/auth/PassReseted";
import Anuncios from "./components/anuncios/Anuncios";
import ListadoAnunciosAll from "./components/anuncios/ListadoAnunciosAll";

import AnuncioState from "./context/anuncios/anuncioState";
import AlertaState from "./context/alertas/alertaState";
import AuthState from "./context/autenticacion/authState";
import tokenAuth from "./config/token";
import RutaPrivada from "./components/rutas/RutaPrivada";
import BusquedaState from "./context/busqueda/busquedaState";

// Revisar si tenemos un token
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <AnuncioState>
        <AlertaState>
          <AuthState>
            <BusquedaState>
              <Router>
                <Switch>
                  <Route exact path="/" component={ListadoAnunciosAll} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                  <Route exact path="/reset-pass" component={ResetPass} />
                  <Route exact path="/newpassword/:token" component={PassReseted} />
                  <RutaPrivada exact path="/anuncios" component={Anuncios} />
                </Switch>
              </Router>
            </BusquedaState>
          </AuthState>
        </AlertaState>
    </AnuncioState>
  );
}

export default App;
