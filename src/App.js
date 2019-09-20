import React from "react";
import Todolist from "./Todolist";
import CreateTask from "./CreateTask";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/create" component={CreateTask} />
            <Route path="/todolist" component={Todolist} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
