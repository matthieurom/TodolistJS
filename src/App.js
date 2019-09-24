import React from "react";
import Todolist from "./Todolist";
import CreateTask from "./UpsertTodo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { setTodo } from "./actions/todoActions";

const axios = require("axios");

class App extends React.Component {
  onSetTodo = async () => {
    const response = await axios.get("http://localhost:8080/"); // j'attend la fin de la requete grace a await et je la met dans response
    this.props.setTodo(response.data);
    // .then(response => this.props.setTodo(response.data));
    //this.props.setTodo(axios.get("localhost:8080/").then(response => response));
  };

  componentWillMount() {
    this.onSetTodo();
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/create" component={CreateTask} />
          <Route path="/update/:id" component={CreateTask} />
          <Route path="/" component={Todolist} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapActionsToProps = {
  setTodo: setTodo
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);
