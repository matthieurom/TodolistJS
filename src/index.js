import React from "react";
import ReactDom from "react-dom";
import "./index.css";
import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import todoReducer from "./reducers/todoReducer";

const store = createStore(
  todoReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

var destination = document.querySelector("#container");

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  destination
);
