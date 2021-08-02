import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import md5 from "md5";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import "../../CSS/App.css";
import ImgStepper from "../../Data/HiEyeBlinks.webm";
import InicioSesionGoogle from "./InicioSesionGoogle";

const baseUrl = "http://localhost:3001/usuario";
const cookies = new Cookies();
toast.configure();
class InicioSesion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        nombreusuario: "",
        contrasena: "",
        rol: "admin",
        fechacreacion: moment().format("DD-MM-YYYY hh:mm:ss"),
      },
      urlAvatar:
        "https://scontent-bog1-1.xx.fbcdn.net/v/t1.0-9/10409440_759040310816193_9203063013688875270_n.jpg?_nc_cat=101&ccb=3&_nc_sid=85a577&_nc_ohc=njocKDhf8JkAX_hYCjs&_nc_ht=scontent-bog1-1.xx&oh=e25d7431932061653fb0e36cc00af801&oe=605B375B",
    };
  }
  Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <a
          color="inherit"
          href="https://www.unicomfacauca.edu.co/investigacion/grupos-investigacion/grupo-tic-unicomfacauca/"
          target="_blank"
        >
          MIND - Investigación en Computación e Informática Aplicada
        </a>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
  handleChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };
  iniciarSesion = async () => {
    await axios
      .get(baseUrl, {
        params: {
          nombreusuario: this.state.form.nombreusuario,
          contrasena: md5(this.state.form.contrasena),
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        if (response.length > 0) {
          var respuesta = response[0];
          cookies.set("id", respuesta.id, { path: "/" });
          cookies.set("nombreusuario", respuesta.nombreusuario, { path: "/" });
          cookies.set("rol", respuesta.rol, { path: "/" });
          cookies.set("fechacreacion", respuesta.fechacreacion, { path: "/" });
          cookies.set("primernombre", respuesta.primernombre, { path: "/" });
          cookies.set("primerapellido", respuesta.primerapellido, {
            path: "/",
          });
          cookies.set("email", "user.admin.email", { path: "/" });
          cookies.set("uid", "idAdmin", { path: "/" });
          console.log("entra");
          alert(`Bienvenido ${respuesta.primernombre}`);
          if (respuesta.rol == "admin") {
            window.location.href = "./admin";
          } else {
            window.location.href = "./user";
          }
        } else {
          alert("El usuario o la contraseña no son correctos");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    if (cookies.get("nombreusuario")) {
      if (cookies.get("rol") == "admin") {
        window.location.href = "./admin";
      } else {
        window.location.href = "./user";
      }
    }
  }
  render() {
    return (
      <>
        <div
          className="row"
          alignItems="center"
          justify="center"
          style={{
            margin: 65,
            justifyContent: "center",
            textAlign: "center",
            display: "flex",
            flexDirection: "inherit",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <div className="col-6">
            <video
              id="preview-player_html5_api"
              crossorigin="anonymous"
              class="vjs-tech"
              tabindex="-1"
              poster={ImgStepper}
              src={ImgStepper}
              autoplay=""
              loop="true"
              muted=""
              playsinline=""
              preload="false"
              alt="GUIv4.gif"
              style={{ width: "110%" }}
            ></video>
          </div>
          <div
            className="row"
            style={{
              justifyContent: "center",
              textAlign: "center",
              display: "flex",
              flexDirection: "inherit",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <div className="col-7">
              <Paper
                style={{
                  padding: "15%",
                  textAlign: "center",
                }}
              >
                <Grid
                  container
                  spacing={3}
                  style={{
                    justifyContent: "center",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <InicioSesionGoogle />
                  <CssBaseline />
                  <Grid item xs={10}>
                    <Avatar alt="Remy Sharp" src={this.state.urlAvatar} />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography
                      component="h1"
                      variant="h5"
                      justify="center"
                      alignItems="center"
                    >
                      Iniciar Sesion
                    </Typography>
                  </Grid>
                </Grid>
                <TextField
                  type="text"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="nombreusuario"
                  label="Correo electronico"
                  name="nombreusuario"
                  autoComplete="email"
                  autoFocus
                  onChange={this.handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="contrasena"
                  label="Contraseña"
                  type="password"
                  id="contrasena"
                  autoComplete="current-password"
                  onChange={this.handleChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => this.iniciarSesion()}
                >
                  Iniciar Sesion
                </Button>
              </Paper>
            </div>
          </div>
        </div>
        <Box mt={8}>{this.Copyright()}</Box>
      </>
    );
  }
}
export default InicioSesion;