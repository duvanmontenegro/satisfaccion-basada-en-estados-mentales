import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import React from "react";
import Cookies from "universal-cookie";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import AppBar from "../../Bar/AppBar";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ShareIcon from "@material-ui/icons/Share";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import MenuIcon from "@material-ui/icons/Menu";
import Avatar from "@material-ui/core/Avatar";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

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
class CPersonalizado extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      color: cookies.get("color"),
      posicionLetra: cookies.get("posicionLetra"),
      titulo: cookies.get("titulo"),
      subtitulo: cookies.get("subtitulo"),
      parrafos: cookies.get("parrafos"),
      imagen: cookies.get("imagen"),

      conimagen: cookies.get("conimagen"),
      conparrafo1: cookies.get("conparrafo1"),
      conparrafo2: cookies.get("conparrafo2"),
      conparrafo3: cookies.get("conparrafo3"),
      consubtitulo: cookies.get("consubtitulo"),
      contitulo: cookies.get("contitulo"),
    };
  }
  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const classes = withStyles();

    return (
      <>
        <AppBar />
        <br />
        <Grid container spacing={0} justify={"center"} alignItems={"center"}>
          <Grid
            item
            xs={10}
            style={{
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 20,
              marginTop: 20,
            }}
          >
            <Card
              style={{
                background: this.state.color,
                textAlign: this.state.posicionLetra,
              }}
            >
              <Typography
                gutterBottom
                style={{
                  marginLeft: 20,
                  marginRight: 20,
                  marginBottom: 20,
                  marginTop: 20,
                }}
                variant={this.state.titulo}
              >
                {this.state.contitulo}
              </Typography>
              <img
                style={{
                  marginLeft: 20,
                  marginRight: 20,
                  marginBottom: 20,
                  marginTop: 20,
                }}
                width={this.state.imagen}
                height="auto"
                src={this.state.conimagen}
              ></img>
              <CardContent>
                <Typography
                  style={{
                    fontSize: this.state.parrafos,
                  }}
                >
                  {this.state.conparrafo1}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: this.state.expanded,
                  })}
                  onClick={() => this.handleExpandClick()}
                  aria-expanded={this.state.expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={this.state.expanded}>
                <CardContent>
                  <Typography variant={this.state.subtitulo}>
                    {this.state.consubtitulo}
                  </Typography>
                  <br />
                  <Typography
                    paragraph
                    style={{
                      fontSize: this.state.parrafos,
                    }}
                  >
                    {this.state.conparrafo2}
                  </Typography>
                  <br />
                  <Typography
                    paragraph
                    style={{
                      fontSize: this.state.parrafos,
                    }}
                  >
                    {this.state.conparrafo3}
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
            <br />
              <hr />

              <div
                className="col-12"
                style={{
                  margin: 20,
                  justifyContent: "space-between",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  flexGrow: 1,
                  width: "110%",
                }}
              >
                <div>
                  <h4>
                    <n>Sección de comentarios</n>
                  </h4>
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div>
                  <ThumbUpIcon />
                  <ThumbDownIcon />
                </div>
                <div>
                  <ShareIcon /> COMPARTIR
                </div>
                <div>
                  <SaveAltIcon /> GUARDAR
                </div>
                <div>
                  <MenuIcon />
                </div>
              </div>
              <hr />
              <div
                className="col-12"
                style={{
                  margin: 20,
                  justifyContent: "space-between",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  flexGrow: 1,
                  width: "110%",
                }}
              >
                <TextField
                  className="col-12"
                  id="input-with-icon-textfield"
                  placeholder="Agrege un comentario público..."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Avatar
                          alt="img user"
                          src={cookies.get("Avatar")}
                          style={{ width: 25, height: 26 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div
                className="col-12"
                style={{
                  justifyContent: "right",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  flexGrow: 1,
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{
                    margin: 5,
                  }}
                >
                  CANCELAR
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  COMENTAR
                </Button>
              </div>
          </Grid>
        </Grid>
      </>
    );
  }
}
export default withStyles(withStyles)(CPersonalizado);