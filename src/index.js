import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Nav from "./components/App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Nav />
    </BrowserRouter>
    {/* <App /> */}
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
