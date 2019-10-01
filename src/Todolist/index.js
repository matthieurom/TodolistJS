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
      login: ""
    };
  }

  getUsername = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user/", {
        headers: { Authorization: localStorage.getItem("token") }
      });
      this.setState({
        login: response.data.login
      });
    } catch {
      console.log("ERROR IS CATCH");
    }
  };

  handleChangeInput = e => {
    this.setState({
      value: e.target.value
    });
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.props.history.push("/login");
  };

  //ComponentWillMount est appelé pour afficher les todos lors du premier chargement de la page
  async componentWillMount() {
    try {
      const response = await axios.get("http://localhost:8080/todo/", {
        headers: { Authorization: localStorage.getItem("token") }
      });
      this.props.setTodos(response.data);
      this.setState({ isLoaded: true });
    } catch {
      this.props.history.push("/login");
    }
    this.getUsername(); //Permet de récupérer le login de l'utilisateur avant que le composant soit monté
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <div className="loader">
          <Loader
            loaded={this.state.isLoaded}
            lines={13}
            length={20}
            width={10}
            radius={30}
            corners={1}
            rotate={0}
            direction={1}
            color="#3379e8"
            speed={1}
            trail={60}
            shadow={false}
            hwaccel={false}
            className="spinner"
            zIndex={2e9}
            top="45%"
            left="50%"
            scale={0.5}
            loadedClassName="loadedContent"
          />
        </div>
      );
    }
    return (
      <div className="todolistMain">
        <div className="header">
          <h1>{this.state.login}'s Todolist</h1>
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
        <TodoItems value={this.state.value} />
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
