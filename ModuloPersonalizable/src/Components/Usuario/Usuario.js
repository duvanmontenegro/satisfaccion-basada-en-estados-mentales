import Button from "@material-ui/core/Button";
import React from "react";
import Cookies from "universal-cookie";
import AppBar from "../../Bar/AppBar";
import "../../CSS/App.css";
import Configurador from "../ConfiguradorCard/Configurador";
import ComponentUsuario from "./ComponenteUsuario";
import firebase from "firebase/app";
import VerComCreado from "../Ccard/VerComponenteCreado";

const cookies = new Cookies();
class Usuario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mostrar: false,
      mostrarP: false,
    };
  }
  componentDidMount = () => {
    const database = firebase.database();

    var uid = cookies.get("uid") + "";

    var rooRef = database.ref("/componenteUser/" + uid);

    rooRef
      .orderByChild("promedio")
      .limitToLast(1)
      .on("value", (snapshot) => {
        var newPost = snapshot.val();

        if (newPost == null) {
          console.log(newPost);
        } else {
          this.setState({
            mostrarP: !this.state.mostrarP,
          });
        }
      });
  };
  irComPersonalizable = () => {
    window.location.href = "./personalizacion";
  };
  mostrarComponente = () => {
    this.setState({
      mostrar: !this.state.mostrar,
    });
  };
  render() {
    return (
      <div>
        {!this.state.mostrar ? (
          <>
            <AppBar />
            <ComponentUsuario />
            {this.state.mostrarP == true ? (
              <div
                className="row"
                style={{
                  margin: 10,
                  justifyContent: "center",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <VerComCreado />
              </div>
            ) : (
              <></>
            )}
            <div className="row" style={{ margin: 20 }}>
              <div className="col-12">
                <n>
                  Si comprendes cual es tu tarea dale al boton de iniciar para
                  ser parte de esta gran esperiencia.
                </n>
              </div>
              <hr />
              <div className="col-12">
                {cookies.get("ActivoConfigurador") ? (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => this.irComPersonalizable()}
                  >
                    Iniciar
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => this.mostrarComponente()}
                  >
                    Iniciar
                  </Button>
                )}
              </div>
            </div>
          </>
        ) : (
          <Configurador />
        )}
      </div>
    );
  }
}
export default Usuario;