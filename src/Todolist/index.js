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
      isLoaded: false
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
  }

  addItem = e => {
    // Checking if inputElement is not empty
    if (this._inputElement.value) {
      var newItem = {
        titre: this._inputElement.value,
        _id: Date.now()
      };
      this.setState(prevState => {
        prevState.items.push(newItem);
        return prevState;
      });
    }

    this._inputElement.value = "";
    console.log(this.state.items);
    e.preventDefault();
  };
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
        <TodoItems
          entries={this.props.todos}
          onDelete={this.delete}
          value={this.state.value}
        />
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
