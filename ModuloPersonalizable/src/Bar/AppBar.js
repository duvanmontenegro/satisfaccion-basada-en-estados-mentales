import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import React from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    color: "inherit",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function PrimarySearchAppBar(props) {
  const classes = useStyles();

  const cerrarSesion = () => {
    cookies.remove("id", { path: "/" });
    cookies.remove("nombreusuario", { path: "/" });
    cookies.remove("rol", { path: "/" });
    cookies.remove("fechacreacion", { path: "/" });
    cookies.remove("primernombre", { path: "/" });
    cookies.remove("primerapellido", { path: "/" });
    cookies.set("estadosesion", true, { path: "/" });
    cookies.remove("cTamano", { path: "/" });
    cookies.remove("cPosicion", { path: "/" });
    cookies.remove("cPosicion2", { path: "/" });
    cookies.remove("cColor", { path: "/" });
    cookies.remove("cContenido", { path: "/" });
    window.location.href = "./";
  };
  const Volver = () => {
    if (cookies.get("rol") == "user") {
      window.location.href = "./user";
    } else {
      window.location.href = "./admin";
    }
  };
  const EntrarAdmin = () => {
    cookies.set("ConfiguradorAdmin", true, { path: "/" });
    window.location.href = "./Configurador";
  };
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar color="primary">
          <Avatar className={classes.menuButton}>
            {cookies.get("rol") == "admin" ? (
              <FolderIcon />
            ) : (
              <Avatar alt="img user" src={cookies.get("Avatar")} />
            )}
          </Avatar>
          <Typography className={classes.title} variant="h6" noWrap>
            {cookies.get("primernombre")} {cookies.get("primerapellido")}
          </Typography>
          {window.location.pathname !== "/Configurador" ? (
            <>
              {cookies.get("rol") == "user" ? (
                <>
                  <div className={classes.grow} />
                  <div className={classes.sectionDesktop}>
                    <Button color="inherit" onClick={() => EntrarAdmin()}>
                      Admin
                    </Button>
                  </div>
                  <div className={classes.sectionDesktop}>
                    <Button color="inherit" onClick={() => Volver()}>
                      Volver
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className={classes.grow} />
                  <div className={classes.sectionDesktop}>
                    <Button color="inherit" onClick={() => Volver()}>
                      Volver
                    </Button>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              {cookies.get("rol") == "user" ? (
                <>
                  <div className={classes.grow} />
                  <div className={classes.sectionDesktop}>
                    <Button color="inherit" onClick={() => Volver()}>
                      Volver
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className={classes.grow} />
                  <div className={classes.sectionDesktop}>
                    <Button color="inherit" onClick={() => Volver()}>
                      Volver
                    </Button>
                  </div>
                </>
              )}
            </>
          )}
          <div className={classes.sectionDesktop}>
            <Button color="inherit" onClick={() => cerrarSesion()}>
              Cerrar sesión
            </Button>
          </div>
          <div className={classes.sectionMobile}>
            <Button color="inherit" onClick={() => cerrarSesion()}>
              Cerrar sesión
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}