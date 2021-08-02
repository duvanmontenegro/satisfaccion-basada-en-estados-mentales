import Container from "@material-ui/core/Container";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
import AppBar from "../../Bar/AppBar";
import CcardInicial from "../Ccard/CcardInicial";

const cookies = new Cookies();
toast.configure();
///<summary>
///Este metodo permite configurar lo que va a ver el usuario final y el como lo va a ver
///Puede ver diferentes noticias - Puede ver estas noticias con diferente color de fondo tamaño o posicion
///</summary>
class Configurador extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 0,
      opcions: [],
      timepoInicial: !cookies.get("ActivoConfigurador")
        ? 5000
        : cookies.get("timepoInicial"),
      cColor: !cookies.get("ActivoConfigurador") ? 0 : cookies.get("cColor"),
      cPosicion: !cookies.get("ActivoConfigurador")
        ? 0
        : cookies.get("cPosicion"),
      cPosicion2: !cookies.get("ActivoConfigurador")
        ? 0
        : cookies.get("cPosicion2"),
      cTamano: !cookies.get("ActivoConfigurador") ? 0 : cookies.get("cTamano"),
      cContenido: !cookies.get("ActivoConfigurador")
        ? 0
        : cookies.get("cContenido"),
      cStepper: 0,
      cCStepper: 0,
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
      usuario: [
        cookies.get("uid"),
        cookies.get("primernombre"),
        cookies.get("primerapellido"),
      ],
      posicion: ["center", "left", "right"],
      //TODO: Se desactiva iteraciones
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
      colores: !cookies.get("ActivoConfigurador")
        ? ["#ffcdd2", "#ef9a9a", "#e57373"]
        : cookies.get("colores"),
    };
    // this.sendData = this.sendData.bind(this);
  }
  crearOpciones = () => {
    var opcions = [];
    this.state.tamano.map((t) =>
      this.state.posicion.map((p) =>
        this.state.colores.map((c) => {
          opcions.push({ c, p, t });
        })
      )
    );
    this.setState({
      opcions: opcions,
    });
  };
  componentDidMount() {
    this.crearOpciones();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.opcions.length > 0 && this.state.color == 0) {
      this.ChangeOpcion(0);
    }
    if (
      prevState.color != this.state.color ||
      prevState.posicionLetra != this.state.posicionLetra ||
      prevState.letra != this.state.letra ||
      prevState.titulo != this.state.titulo ||
      prevState.subtitulo != this.state.subtitulo ||
      prevState.parrafos != this.state.parrafos ||
      prevState.contenidos != this.state.contenidos
    ) {
      this.sendData();
    }
  }
  ChangeOpcion = (option) => {
    if (option <= this.state.opcions.length - 1) {
      setTimeout(() => {
        this.SetCountStepper(option);
        this.ChangeOpcion(option + 1);
      }, this.state.timepoInicial);
      this.SetValueOpcion(option);
    } else {
      console.log("Configuracion finalizada");
    }
  };
  SetCountStepper(option) {
    if (option < 1) {
      this.setState({
        cStepper: 0,
      });
    }
    if (option >= 1) {
      this.setState({
        cStepper: 1,
      });
    }
    if (option >= this.state.opcions.length - 1) {
      this.setState({
        cStepper: 2,
      });
      setTimeout(() => {
        this.setState({
          cStepper: 3,
        });
        this.mensajeCierre();
      }, 500);
    }
  }
  SetValueOpcion(posicion) {
    this.setState({
      color: this.state.opcions[posicion].c,
      posicionLetra: this.state.opcions[posicion].p,
      letra: this.state.opcions[posicion].t,
      titulo: this.state.opcions[posicion].t.titulo,
      subtitulo: this.state.opcions[posicion].t.subtitulo,
      parrafos: this.state.opcions[posicion].t.parrafos,
      imagen: this.state.opcions[posicion].t.imagen,
    });
  }
  sendData() {
    var hoy = new Date();
    var fecha =
      hoy.getDate() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getFullYear();
    var hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
    var fechaYHora = fecha + " " + hora;
    var value = {
      uid: cookies.get("uid"),
      usuario: this.state.usuario,
      color: this.state.color,
      posicionLetra: this.state.posicionLetra,
      letra: this.state.letra,
      titulo: this.state.titulo,
      subtitulo: this.state.subtitulo,
      parrafos: this.state.parrafos,
      imagen: this.state.imagen,
      contenidos: this.state.contenidos[this.state.cContenido],
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
    }
  }
  mensajeCierre() {
    console.log("Envio Fin");
    var data = {
      uid: cookies.get("uid"),
      mensaje: "FinTomaMuestraUsuario",
    };
    console.log(data);
    var url = "http://localhost:5000/api";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));
  }
  render() {
    const { cColor, cPosicion, cPosicion2, cTamano, cContenido, cStepper } =
      this.state;
    return (
      <div>
        <AppBar />
        <Container
          component="main"
          style={{
            justifyContent: "center",
            textAlign: "center",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          {cookies.get("ActivoConfigurador") ? (
            <CcardInicial
              cColor={cookies.get("cColor")}
              cPosicion={cookies.get("cPosicion")}
              cPosicion2={0}
              // cPosicion2={cookies.get('cPosicion2')}
              cTamano={cookies.get("cTamano")}
              cContenido={cookies.get("cContenido")}
              cStepper={cStepper}
              colores={this.state.colores}
              posicion={this.state.posicion}
              posicionT={this.state.posicionT}
              tamano={this.state.tamano}
              contenidos={this.state.contenidos}
              color={this.state.color}
              letra={this.state.letra}
              titulo={this.state.titulo}
              subtitulo={this.state.subtitulo}
              parrafos={this.state.parrafos}
              imagen={this.state.imagen}
              posicionLetra={this.state.posicionLetra}
            />
          ) : (
            <CcardInicial
              cColor={cColor}
              cPosicion={cPosicion}
              cPosicion2={0}
              // cPosicion2={cPosicion2}
              cTamano={cTamano}
              cContenido={0}
              cStepper={cStepper}
              colores={this.state.colores}
              posicion={this.state.posicion}
              posicionT={this.state.posicionT}
              tamano={this.state.tamano}
              contenidos={this.state.contenidos}
              color={this.state.color}
              letra={this.state.letra}
              titulo={this.state.titulo}
              subtitulo={this.state.subtitulo}
              parrafos={this.state.parrafos}
              imagen={this.state.imagen}
              posicionLetra={this.state.posicionLetra}
            />
          )}
        </Container>
      </div>
    );
  }
}
export default Configurador;