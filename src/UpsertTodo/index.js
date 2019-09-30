import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { connect } from "react-redux";
import { updateTodo, addTodo, setTodos } from "../actions/todoActions";
import axios from "axios";

class UpsertTodo extends React.Component {
  state = {
    item: null,
    inputTitleValue: ""
  };

  async componentWillMount() {
    try {
      const response = await axios.get("http://localhost:8080/todo/", {
        headers: { Authorization: localStorage.getItem("token") }
      });
      this.props.setTodos(response.data);
    } catch {
      this.props.history.push("/login");
    }
  }

  // Cette fonction vérifie si l'ID est passé par l'url, si oui alors on est dans une modif de tache sinon dans une création de tache
  isIdParamEntered = () => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      return true;
    } else {
      return false;
    }
  };

  getItem = () => {
    const itemToDisplay = this.props.todos.find(
      item => item._id === this.props.match.params.id
    );
    return itemToDisplay;
  };

  onUpdateTodo = e => {
    console.log("Props in onUpdateTodo :", this.props);
    e.preventDefault();
    var item = this.getItem();
    var updateItem = {
      ...item,
      titre: this._inputTitleElement.value,
      description: this._textAreaDescriptionElement.value
    };
    axios
      .patch(`http://localhost:8080/todo/${item._id}`, updateItem, {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(response => this.props.updateTodo(response.data));
    this.props.history.push("/");
  };

  addItem = e => {
    console.log("ADDITEM EXECUTED");
    e.preventDefault();
    axios
      .post(
        "http://localhost:8080/todo",
        {
          titre: this._inputTitleElement.value,
          description: this._textAreaDescriptionElement.value,
          done: false
        },
        {
          headers: { Authorization: localStorage.getItem("token") }
        }
      )
      .then(response => {
        this.props.addTodo(response.data);
      });
    this.props.history.push("/");
  };

  componentDidUpdate() {
    const itemFromProps = this.getItem();
    if (!this.state.item && itemFromProps) {
      // On utilse la méthode componentDidMount pour préremplir les champ input après avoir cliqué sur todo
      this.setState({
        item: itemFromProps,
        inputTitleValue: itemFromProps.titre
      });
    }
  }

  render() {
    console.log("Props in CreateTask: ", this.props);
    const isIdParamEntered = this.isIdParamEntered();
    var item = null;
    if (isIdParamEntered) {
      item = this.getItem();
      if (!item) {
        return <p>ERROR</p>;
      }
    }

    return (
      <div className="UpsertTodo">
        <div className="header">
          {/* On vérifie que params.id existe sinon on a erreur undefined */}
          {isIdParamEntered ? (
            <h1>Modify task : {item.titre}</h1>
          ) : (
            <h1>Create a task</h1>
          )}
          <div className="header-button">
            <Link to="/">
              <button>Back to Todolist</button>
            </Link>
            <div className="header-buttonCheckTask">
              <p>Task done ?</p>
              <input type="checkbox" />
            </div>
          </div>
        </div>

        <div className="content">
          <form onSubmit={isIdParamEntered ? this.onUpdateTodo : this.addItem}>
            <input
              placeholder={isIdParamEntered ? item.titre : "Enter a task name"}
              ref={a => (this._inputTitleElement = a)}
              value={this.state.inputTitleValue}
              onChange={e => this.setState({ inputTitleValue: e.target.value })}
            ></input>
            <textarea
              placeholder="Enter a description"
              ref={a => (this._textAreaDescriptionElement = a)}
            >
              {isIdParamEntered
                ? item.description
                : "" /*SI un id est entré alors on affiche sa description sinon "" */}
            </textarea>

            <button type="submit">
              {isIdParamEntered ? "Modify task " : "Add task"}
            </button>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
const mapActionsToProps = {
  updateTodo: updateTodo,
  addTodo: addTodo,
  setTodos: setTodos
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(UpsertTodo);
