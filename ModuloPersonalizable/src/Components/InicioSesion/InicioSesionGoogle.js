import firebase from "firebase";
import React, { Component } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Cookies from "universal-cookie";
import "../../CSS/App.css";

const cookies = new Cookies();
class InicioSesionGoogle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      nombre: "",
      foto: "",
      rows: [],
      isSignedIn: false,
      signInFlow: "popup",
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
      callbacks: {
        signInSuccess: () => false,
      },
    };
  }
  componentDidMount = () => {
    if (cookies.get("estadosesion")) {
      firebase.auth().signOut();
      cookies.remove("estadosesion", { path: "/" });
      cookies.remove("cTamano", { path: "/" });
      cookies.remove("cPosicion", { path: "/" });
      cookies.remove("cPosicion2", { path: "/" });
      cookies.remove("cColor", { path: "/" });
      cookies.remove("cContenido", { path: "/" });
    }
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ isSignedIn: !!user });
    });
  };
  llenarCookies = async (user) => {
    if (user != null) {
      cookies.set("email", user.email, { path: "/" });
      cookies.set("rol", "user", { path: "/" });
      cookies.set("primernombre", user.displayName, { path: "/" });
      cookies.set("Avatar", user.photoURL, { path: "/" });
      cookies.set("signin", user.providerId, { path: "/" });
      cookies.set("uid", user.uid, { path: "/" });
      alert(`Bienvenido ${user.displayName}`);
      window.location.href = "./user";
    }
  };
  cerrarSesion = async () => {
    firebase.auth().signOut();
  };
  render() {
    return (
      <div className="App">
        ¿Ya tienes tu casco pusto?, entonces que esperas ingresa con toda
        seguridad.
        {this.state.isSignedIn ? (
          <span>{this.llenarCookies(firebase.auth().currentUser)}</span>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.state}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    );
  }
}
export default InicioSesionGoogle;