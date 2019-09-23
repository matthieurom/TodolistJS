import React from "react";
import Todolist from "./Todolist";
import CreateTask from "./UpsertTodo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

class App extends React.Component {
  render() {
    console.log("App props : ", this.props);
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

export default connect(mapStateToProps)(App);
