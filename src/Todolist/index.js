import React from "react";
import TodoItems from "./TodoItems";
import "./index.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setTodos } from "../actions/todoActions";
import axios from "axios";
//import Loader from "react-loader";
var Loader = require("react-loaders").Loader;

class Todolist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      isLoaded: false,
      responseFromDb: []
    };
  }

  handleChangeInput = e => {
    this.setState({
      value: e.target.value
    });
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.props.history.push("/login");
  };

  getSetTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/todo/", {
        headers: { Authorization: localStorage.getItem("token") }
      });
      this.props.setTodos(response.data);
      this.setState({ responseFromDb: response.data });
    } catch {
      this.props.history.push("/login");
    }
  };

  //ComponentWillMount est appelé pour afficher les todos lors du premier chargement de la page
  async componentWillMount() {
    try {
      const response = await axios.get("http://localhost:8080/todo/", {
        headers: { Authorization: localStorage.getItem("token") }
      });
      this.props.setTodos(response.data);
      this.setState({ responseFromDb: response.data });
    } catch {
      this.props.history.push("/login");
    }
    console.log("STATE IN WILL MOUNT ", this.state);
  }

  //componentWillUpdate est appelé pour afficher les todos ajoutés notamment
  componentDidMount() {
    // this.props.setTodos(this.state.responseFromDb);
    console.log("STATE IN Did Mount ", this.state);
  }

  render() {
    return (
      <div className="todolistMain">
        <div className="header">
          <h1>Todolist</h1>
          <div className="header_display">
            <input
              placeholder="Search a task"
              onChange={e => this.handleChangeInput(e)}
            ></input>
            <Link to="/create">
              <button>New task</button>
            </Link>{" "}
            <button onClick={this.handleLogout}>Log out</button>
          </div>
        </div>
        <TodoItems entries={this.props.todos} value={this.state.value} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

const mapActionsToProps = {
  setTodos: setTodos
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Todolist);
