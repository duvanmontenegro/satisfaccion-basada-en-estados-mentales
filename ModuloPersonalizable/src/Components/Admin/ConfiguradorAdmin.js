import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
import Cookies from "universal-cookie";
import ColorList from "./ListaColores";

const cookies = new Cookies();
const useStyles = {
  botonGuardar: {
    background: "#4caf50",
    border: 0,
    borderRadius: 3,
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  botonBuscar: {
    background: "#303f9f",
    border: 0,
    borderRadius: 3,
    color: "white",
    height: 40,
    padding: "0 20px",
  },
  campos: {
    margin: 5,
    width: "120%",
    border: 0,
    borderRadius: 3,
  },
};

class ConfiguradorAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ConfiguradorAdmin: false,
      form: {
        cTamano: -1,
        cPosicion: -1,
        cPosicion2: -1,
        cContenido: -1,
        cColor: -1,
        timepoInicial: -1,
        coloresList: [],
      },
      timepoInicialL: [
        { tiempo: 0, nombre: "Sin tiempo" },
        { tiempo: 1000, nombre: "1 segundo" },
        { tiempo: 2000, nombre: "2 segundos" },
        { tiempo: 5000, nombre: "5 segundos" },
        { tiempo: 10000, nombre: "10 segundos" },
      ],
      tamano: [
        {
          nombre: "Pequeño",
          titulo: "h4",
          subtitulo: "h6",
          parrafos: 16,
          imagen: "60%",
        },
        {
          nombre: "Grande",
          titulo: "h5",
          subtitulo: "subtitle1",
          parrafos: 12,
          imagen: "80%",
        },
      ],
      posicion: ["center", "left", "right"],
      posicionT: ["center", "flex-start", "flex-end"],
      //https://www.unicomfacauca.edu.co/tag/premio/
      //https://www.elespectador.com/entretenimiento/musica/premios-lo-nuestro-como-ver-la-transmision/
      //https://www.eltiempo.com/cultura/cine-y-tv/globos-de-oro-2021-conozca-las-series-peliculas-y-actores-nominados-564266
      contenidos: [
        {
          titulo:
            "Ganamos premio de Cooperación Internacional de la Universidad Politécnica de Madrid",
          parrafo1:
            "En pasados días, obtuvimos el premio de Cooperación Internacional en Investigación para el Desarrollo, por parte de la Universidad Politécnica de Madrid, gracias al trabajo académico y de investigación desarrollado con el Parque Tecnológico de Innovación del Café – Tecnicafé. […]",
          subtitulo:
            "premio, reconocimiento, Universidad Politecnica de Madrid, upm",
          parrafo2:
            "En pasados días, obtuvimos el premio de Cooperación Internacional en Investigación para el Desarrollo, por parte de la Universidad Politécnica de Madrid, gracias al trabajo académico y de investigación desarrollado con el Parque Tecnológico de Innovación del Café – Tecnicafé.",
          parrafo3:
            "La ceremonia de entrega de estos reconocimientos, denominados los Premios anuales de Investigación e Innovación 2020, la hace esta universidad española donde destaca sus alianzas estratégicas y proyectos desarrollados en conjunto con otras instituciones locales e internacionales. Además, tiene por objetivo premiar a aquellos aliados, seleccionados mediante concurrencia competitiva, que han contribuido significativamente a fomentar la investigación, innovación y la transferencia de conocimientos de la UPM.",
          imagen:
            "https://www.unicomfacauca.edu.co/wp-content/uploads/Premio-UPM.jpg",
        },
        {
          titulo:
            "Premios Lo Nuestro: hora y cómo ver a Maluma y otros artistas",
          parrafo1:
            "Aunque las nominaciones de Premios Lo Nuestro siguen dominadas por los artistas de música urbana, con base en el reguetón, los exponentes y canciones de los distintos subgéneros del regional mexicano han comenzado a pisarles los talones. / Agencias",
          subtitulo: "Música18 feb. 2021 - 7:04 p. m. Por: Agencia EFE",
          parrafo2:
            "Aunque las nominaciones de Premios Lo Nuestro siguen dominadas por los artistas de música urbana, con base en el reguetón, los exponentes y canciones de los distintos subgéneros del regional mexicano han comenzado a pisarles los talones. / Agencias",
          parrafo3:
            "La trigésima tercera entrega de Premio Lo Nuestro, el galardón más antiguo de música latina en Estados Unidos, se realiza este jueves en la ciudad estadounidense de Miami con varios números en vivo y alfombra, aunque sin público y con la notable ausencia de J Balvin, el artista con más nominaciones.",
          imagen:
            "https://www.elespectador.com/resizer/1M6ysIvyemIITjAeeI7AqX7dLbA=/657x0/cloudfront-us-east-1.images.arcpublishing.com/elespectador/K4GAYQTL5FCGXKLYIRNDEU7XB4.jpg",
        },
        {
          titulo:
            "'Gambito de Dama' y 'The Crown', favoritos a los Globos de Oro 2021",
          parrafo1:
            "La temporada de premios en Hollywood arranca este miércoles, en la madrugada de Los Ángeles (EE.UU.), con el anuncio de las películas y series de televisión nominadas a los Globos de Oro en una de sus ediciones más abiertas e impredecibles por la pandemia del coronavirus.",
          subtitulo:
            "Plataformas como Netflix esperan las nominaciones a los Golden Globes.",
          parrafo2:
            "La temporada de premios en Hollywood arranca este miércoles, en la madrugada de Los Ángeles (EE.UU.), con el anuncio de las películas y series de televisión nominadas a los Globos de Oro en una de sus ediciones más abiertas e impredecibles por la pandemia del coronavirus.",
          parrafo3:
            "Borat 2, Nomadland, Gambito de Dama, Orzac y The Crown son algunas de las producciones que suenan como favoritas para la Asociación de la Prensa Extranjera de Hollywood (HFPA), un grupo de unos 90 periodistas que, acostumbrados a viajes, premieres, fiestas y entrevistas, deberán escoger lo mejor del año desde el sofá de su casa.",
          imagen:
            "https://www.eltiempo.com/files/article_main/files/crop/uploads/2020/11/16/5fb3353273d77.r_1612380235380.0-0-1033-512.jpeg",
        },
      ],
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
  realizarCambios = () => {
    if (
      this.state.form.cTamano > -1 &&
      this.state.form.cPosicion > -1 &&
      this.state.form.coloresList.length > 0 &&
      this.state.form.cContenido > -1 &&
      this.state.form.timepoInicial > -1
    ) {
      this.setState({
        ConfiguradorAdmin: true,
      });
      cookies.set("cTamano", this.state.form.cTamano, {
        path: "/personalizacion",
      });
      cookies.set("cPosicion", this.state.form.cPosicion, {
        path: "/personalizacion",
      });
      // cookies.set('cPosicion2', this.state.form.cPosicion2, { path: "/personalizacion" });
      cookies.set("cPosicion2", 0, { path: "/personalizacion" });
      // cookies.set('cColor', this.state.form.cColor, { path: "/personalizacion" });
      cookies.set("cColor", 0, { path: "/personalizacion" });
      cookies.set("colores", this.state.form.coloresList, {
        path: "/personalizacion",
      });
      cookies.set("cContenido", this.state.form.cContenido, {
        path: "/personalizacion",
      });
      cookies.set("timepoInicial", this.state.form.timepoInicial, {
        path: "/",
      });
      cookies.set("ConfiguradorAdmin", this.state.ConfiguradorAdmin, {
        path: "/personalizacion",
      });
      cookies.set("ActivoConfigurador", true, { path: "/" });

      window.location.pathname = "./personalizacion";
      if (cookies.get("rol") == "user") {
        window.location.href = "../user";
      }
    }
  };
  limpiar = () => {
    cookies.remove("cTamano", { path: "/" });
    cookies.remove("cPosicion", { path: "/" });
    cookies.remove("cPosicion2", { path: "/" });
    cookies.remove("cColor", { path: "/" });
    cookies.remove("cContenido", { path: "/" });
    cookies.remove("timepoInicial", { path: "/" });
    cookies.remove("ConfiguradorAdmin", { path: "/" });
    cookies.remove("ActivoConfigurador", { path: "/" });
    this.setState({
      cTamano: -1,
      cPosicion: -1,
      cPosicion2: -1,
      cContenido: -1,
      cColor: -1,
      cColor: -1,
    });
    if (cookies.get("rol") == "user") {
      window.location.href = "../user";
    } else {
      window.location.href = "./admin";
    }
  };
  seleccionarColor = (lcolore) => {
    this.setState({
      form: {
        ...this.state.form,
        coloresList: lcolore,
      },
    });
  };
  iniciarDemo = async () => {
    window.location.href = "./demo";
  };
  render() {
    const { classes } = this.props;
    return (
      <>
        <Paper
          style={{
            padding: "5%",
            textAlign: "center",
          }}
        >
          <div className="row" style={{ margin: 10 }}>
            <div className="col-12" style={{ margin: 10, marginBottom: 20 }}>
              <h3>Configuración manual del componente</h3>
            </div>

            <div className="col-6" style={{ marginBottom: 20 }}>
              <InputLabel id="timepoInicial">
                Tiempo inicial de la iteracion
              </InputLabel>
              <select
                labelId="timepoInicial"
                id="timepoInicial"
                value={this.state.timepoInicial}
                onChange={this.handleChange}
                label="timepoInicial"
                name="timepoInicial"
              >
                <option value={-1}>Seleccionar</option>
                {
                  <>
                    {this.state.timepoInicialL.map((dat, index) => {
                      return (
                        <option
                          key={"timepoInicial" + index}
                          value={dat.tiempo}
                        >
                          {dat.nombre}
                        </option>
                      );
                    })}
                  </>
                }
              </select>
            </div>
            <div className="col-6" style={{ marginBottom: 20 }}>
              <InputLabel id="cTamano">Tamaño de la letra</InputLabel>
              <select
                labelId="cTamano"
                id="cTamano"
                value={this.state.cTamano}
                onChange={this.handleChange}
                label="cTamano"
                name="cTamano"
              >
                <option value={-1}>Seleccionar</option>
                {
                  <>
                    {this.state.tamano.map((dat, index) => {
                      return (
                        <option key={"cTamano" + index} value={index}>
                          {dat.nombre}
                        </option>
                      );
                    })}
                  </>
                }
              </select>
            </div>
          </div>
          <div className="row" style={{ margin: 10 }}>
            <div className="col-6">
              <InputLabel id="cPosicion">Posicion del texto</InputLabel>
              <select
                labelId="cPosicion"
                id="cPosicion"
                value={this.state.cPosicion}
                onChange={this.handleChange}
                label="cPosicion"
                name="cPosicion"
              >
                <option value={-1}>Seleccionar</option>
                {
                  <>
                    {this.state.posicion.map((dat, index) => {
                      return (
                        <option key={"cPosicion" + index} value={index}>
                          {dat}
                        </option>
                      );
                    })}
                  </>
                }
              </select>
            </div>
            <div className="col-12" style={{ marginBottom: 20 }}>
              <InputLabel id="cContenido">Noticia</InputLabel>
              <select
                labelId="cContenido"
                id="cContenido"
                value={this.state.cContenido}
                onChange={this.handleChange}
                label="cContenido"
                name="cContenido"
              >
                <option value={-1}>Seleccionar</option>
                {
                  <>
                    {this.state.contenidos.map((dat, index) => {
                      return (
                        <option key={"cContenido" + index} value={index}>
                          {dat.titulo}
                        </option>
                      );
                    })}
                  </>
                }
              </select>
            </div>
          </div>
          <div className="col-12" style={{ margin: 10, alignItems: "center" }}>
            <Paper
              style={{
                padding: "5%",
                textAlign: "center",
              }}
            >
              <ColorList seleccionarColor={this.seleccionarColor} />
            </Paper>
          </div>
          <div className="row" style={{ margin: 10 }}>
            <div className="col-6">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => this.realizarCambios()}
              >
                Realizar Cambios
              </Button>
            </div>
            <div className="col-6">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => this.limpiar()}
              >
                Limpiar Cambios
              </Button>
            </div>
          </div>
          <div className="row" style={{ margin: 10 }}>
            {cookies.get("rol") == "admin" ? (
              <div className="col-12">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => this.iniciarDemo()}
                >
                  Demo
                </Button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </Paper>
      </>
    );
  }
}
export default withStyles(useStyles)(ConfiguradorAdmin);