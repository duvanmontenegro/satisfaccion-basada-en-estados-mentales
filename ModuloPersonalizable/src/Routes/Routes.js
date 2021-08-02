import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Admin from "../Components/Admin/Admin";
import AdminC from "../Components/Admin/AdminC";
import Configurador from "../Components/ConfiguradorCard/Configurador";
import InicioSesion from "../Components/InicioSesion/InicioSesion";
import Usuario from "../Components/Usuario/Usuario";
import "../CSS/App.css";
import DemoC from "../Demo/Demo";
import Personalizado from "../Components/ComPersonalizado/CPersonalizado";

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={InicioSesion} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/Configurador" component={AdminC} />
          <Route exact path="/user" component={Usuario} />
          <Route exact path="/personalizacion" component={Configurador} />
          <Route exact path="/demo" component={DemoC} />
          <Route exact path="/micomponente" component={Personalizado} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default Routes;