import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes/Routes";
import firebase from "firebase";
firebase.initializeApp({
  apiKey: "AIzaSyBCrdVB055-0jObg31ooDPk_F5a-MxgvN0",
  authDomain: "pagina-personalizable.firebaseapp.com",
  databaseURL: "https://pagina-personalizable-default-rtdb.firebaseio.com",
  projectId: "pagina-personalizable",
  storageBucket: "pagina-personalizable.appspot.com",
  messagingSenderId: "927262150263",
  appId: "1:927262150263:web:4c1a38d21db808d3e10072",
});
ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById("root")
);