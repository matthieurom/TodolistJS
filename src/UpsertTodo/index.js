import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { connect } from "react-redux";
import { updateTodo, addTodo } from "../actions/todoActions";
import axios from "axios";

class CreateTask extends React.Component {
  state = {
    item: null,
    inputTitleValue: ""
  };
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
    const itemToDisplay = this.props.items.find(
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
      .patch(`http://localhost:8080/${item._id}`, updateItem)
      .then(response => this.props.updateTodo(response.data));
    // this.props.updateTodo(updateItem);
    this.props.history.push("/");
  };

  addItem = e => {
    console.log("ADDITEM EXECUTED");
    e.preventDefault();
    axios
      .post("http://localhost:8080", {
        titre: this._inputTitleElement.value,
        description: this._textAreaDescriptionElement.value
      })
      .then(response => {
        this.props.addTodo(response.data);
        this.props.history.push("/");
      });
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

  handleTitleChange = (e, item) => {
    var updateItem = this.getItem();
    if (updateItem) {
      this.setState({ inputTitleValue: e.target.value });
    } else {
      return item.titre;
    }
  };

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
      <div className="CreateTask">
        {/* On vérifie que params.id existe sinon on a erreur undefined */}
        {isIdParamEntered ? (
          <h1>Modify task : {item.titre}</h1>
        ) : (
          <h1>Create a task</h1>
        )}
        <Link to="/">
          <button>Back to Todolist</button>
        </Link>
        <div className="header">
          <form onSubmit={isIdParamEntered ? this.onUpdateTodo : this.addItem}>
            <input
              placeholder={isIdParamEntered ? item.titre : "Enter a task name"}
              ref={a => (this._inputTitleElement = a)}
              value={this.state.inputTitleValue}
              onChange={e => this.handleTitleChange(e, item)}
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
  addTodo: addTodo
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(CreateTask);
