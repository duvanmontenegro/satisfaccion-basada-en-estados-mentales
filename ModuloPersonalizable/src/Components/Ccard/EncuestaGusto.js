import Container from "@material-ui/core/Container";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
import AppBar from "../../Bar/AppBar";
import CcardInicial from "../Ccard/CcardInicial";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";

const cookies = new Cookies();
toast.configure();
///<summary>
///Este metodo permite configurar lo que va a ver el usuario final y el como lo va a ver
///Puede ver diferentes noticias - Puede ver estas noticias con diferente color de fondo tamaño o posicion
///</summary>
class Encuesta extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        Encuesta: -1,
      },
      titulo: this.props.titulo,
    };
  }
  handleChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };
  sendData() {
      if(this.state.Encuesta!= -1){
    var hoy = new Date();
    var fecha =
      hoy.getDate() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getFullYear();
    var hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
    var fechaYHora = fecha + " " + hora;
    var value = {
      uid: cookies.get("uid"),
      opinioNoticia: this.state.form.cTamano,
      fechaYHora: fechaYHora,
    };
    if (this.state.color != 0) {
      value = JSON.stringify(value);
      var url = "http://localhost:5000/api";
      var data = { mensaje: value };
      fetch(url, {
        method: "POST", // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => console.log("Success:", response));
    }}else{
        console.log("Debe selecionar una respuesta")
        alert(`Debe selecionar una respuesta ¿La noticia "${this.state.titulo}" era de su agredo?`)
    }
  }
  render() {
    const { cColor, cPosicion, cPosicion2, cTamano, cContenido, cStepper } =
      this.state;
    return (
      <div>
        <div className="row" style={{ margin: 20 }}>
          <div className="col-12" style={{ marginBottom: 20 }}>
            <InputLabel id="Encuesta">
              ¿La noticia <n>"{this.state.titulo}"</n> era de su agredo?
            </InputLabel>
            <select
              labelId="Encuesta"
              id="Encuesta"
              value={0}
              value={this.state.Encuesta}
              onChange={this.handleChange}
              label="Encuesta"
              name="Encuesta"
            >
              <option value={-1}>Seleccionar</option>
              <option key={"Encuesta" + 0} value={0}>
                Si
              </option>
              <option key={"Encuesta" + 1} value={1}>
                No
              </option>
            </select>
          </div>

          <div className="col-12" style={{ marginBottom: 20 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => this.sendData()}
            >
              Enviar respuestas
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default Encuesta;
