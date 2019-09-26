import React from "react";
import Todolist from "./Todolist";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import UpsertTodo from "./UpsertTodo/index";
import Login from "./Login/index";

class App extends React.Component {
  // onSetTodo = async () => {
  //   const response = await axios.get("http://localhost:8080/"); // j'attend la fin de la requete grace a await et je la met dans response
  //   this.props.setTodo(response.data);
  //   // .then(response => this.props.setTodo(response.data));
  //   //this.props.setTodo(axios.get("localhost:8080/").then(response => response));
  // };

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/create" component={UpsertTodo} />
          <Route path="/update/:id" component={UpsertTodo} />
          <Route path="/" component={Todolist} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(App);
