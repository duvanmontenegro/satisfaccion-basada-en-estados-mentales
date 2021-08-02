import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import React from "react";
import Cookies from "universal-cookie";
import "firebase/auth";
import "firebase/firestore";
import VerComCreado from "./VerComponenteCreado";
import Avatar from "@material-ui/core/Avatar";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ShareIcon from "@material-ui/icons/Share";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import MenuIcon from "@material-ui/icons/Menu";

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
class CcardInicial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      colores: this.props.colores,
      posicion: this.props.posicion,
      posicionT: this.props.posicionT,
      contenidos: this.props.contenidos,
      tamano: this.props.tamano,
    };
  }
  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  getSteps() {
    return [
      "Se ha iniciado la configuración",
      "Se está procesando tu personalización",
      "Se está finalizando tu personalización",
    ];
  }
  render() {
    const classes = withStyles();
    const activeStep = this.props.cStepper; //cColor es el que mas dura
    const steps = this.getSteps();

    return (
      <>
        <br />
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Grid
          container
          spacing={3}
          justify={this.state.posicionT[this.props.cPosicion2]}
          alignItems={this.state.posicionT[this.props.cPosicion2]}
        >
          {activeStep === steps.length ? (
            <div
              class="row"
              style={{
                margin: 10,
                justifyContent: "center",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
                width: "110%",
              }}
            >
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
                {/* <Encuesta
                  titulo={this.state.contenidos[this.props.cContenido].titulo}
                /> */}
              </Paper>
              <br />
              <VerComCreado />
            </div>
          ) : (
            <Grid
              item
              xs={10}
              style={{
                margin: 10,
              }}
            >
              <Card
                style={{
                  background: this.props.color,
                  textAlign: this.props.posicionLetra,
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
                  variant={this.props.titulo}
                >
                  {this.state.contenidos[this.props.cContenido].titulo}
                </Typography>
                <img
                  style={{
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 20,
                    marginTop: 20,
                  }}
                  width={this.props.imagen}
                  height="auto"
                  src={this.state.contenidos[this.props.cContenido].imagen}
                ></img>
                <CardContent>
                  <Typography
                    style={{
                      fontSize: this.props.parrafos,
                    }}
                  >
                    {this.state.contenidos[this.props.cContenido].parrafo1}
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
                    <Typography variant={this.props.subtitulo}>
                      {this.state.contenidos[this.props.cContenido].subtitulo}
                    </Typography>
                    <br />
                    <Typography
                      paragraph
                      style={{
                        fontSize: this.props.parrafos,
                      }}
                    >
                      {this.state.contenidos[this.props.cContenido].parrafo2}
                    </Typography>
                    <br />
                    <Typography
                      paragraph
                      style={{
                        fontSize: this.props.parrafos,
                      }}
                    >
                      {this.state.contenidos[this.props.cContenido].parrafo3}
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
          )}
        </Grid>
      </>
    );
  }
}
export default withStyles(withStyles)(CcardInicial);