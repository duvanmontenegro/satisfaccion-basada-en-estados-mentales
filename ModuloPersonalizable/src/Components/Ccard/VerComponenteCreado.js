import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Cookies from "universal-cookie";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const cookies = new Cookies();

withStyles(({ transitions }) => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",

    transition: transitions.create("transform", {
      duration: transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));
class VerComponenteCreaso extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  verMiComponente = () => {
    const database = firebase.database();

    var uid = cookies.get("uid") + "";

    var rooRef = database.ref("/componenteUser/" + uid);

    rooRef
      .orderByChild("promedio")
      .limitToLast(1)
      .on("value", (snapshot) => {
        var newPost = snapshot.val();
        if (newPost == null) {
          alert(
            "Se están cargando las ultimas configuraciones de tu componente."
          );
        } else {
          var jsonString = JSON.stringify(newPost);

          var id = jsonString.substring(2, jsonString.indexOf('":{"color":"'));

          var newPostId = newPost[id];

          var cont = newPostId["contenidos"];

          cookies.set("color", newPostId["color"], { path: "/" });
          cookies.set("posicionLetra", newPostId["posicionLetra"], {
            path: "/",
          });
          cookies.set("titulo", newPostId["titulo"], { path: "/" });
          cookies.set("subtitulo", newPostId["subtitulo"], { path: "/" });
          cookies.set("parrafos", newPostId["parrafos"], { path: "/" });
          cookies.set("imagen", newPostId["imagen"], { path: "/" });

          cookies.set("conimagen", cont["imagen"], { path: "/" });
          cookies.set("conparrafo1", cont["parrafo1"], { path: "/" });
          cookies.set("conparrafo2", cont["parrafo2"], { path: "/" });
          cookies.set("conparrafo3", cont["parrafo3"], { path: "/" });
          cookies.set("consubtitulo", cont["subtitulo"], { path: "/" });
          cookies.set("contitulo", cont["titulo"], { path: "/" });

          window.location.pathname = "./micomponente";
          window.location.href = "./micomponente";
        }
      });
  };
  render() {
    const classes = withStyles();

    return (
      <>
        <Paper
          style={{
            margin: 20,
            justifyContent: "center",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            width: "110%",
          }}
        >
          <div
            class="row"
            style={{
              margin: 20,
              justifyContent: "center",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
              width: "110%",
            }}
          >
            <div class="col-12" style={{ margin: 20 }}>
              <Typography className={classes.instructions}>
                Configuracion finalizada
              </Typography>
            </div>
            <div class="col-12" style={{ margin: 10 }}>
              <Button 
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => this.verMiComponente()}>
                Ver mi componente
              </Button>
            </div>
          </div>
        </Paper>
      </>
    );
  }
}
export default withStyles(withStyles)(VerComponenteCreaso);
