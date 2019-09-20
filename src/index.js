import React from "react";
import ReactDom from "react-dom";
import "./index.css";
import App from "./App";

var destination = document.querySelector("#container");

ReactDom.render(
  <div>
    <App />
  </div>,
  destination
);
