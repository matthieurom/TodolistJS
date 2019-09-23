import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { connect } from "react-redux";
import { updateTodo, addTodo } from "../actions/todoActions";

class CreateTask extends React.Component {
  state = {
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
    e.preventDefault();
    var item = this.getItem();
    var updateItem = {
      ...item,
      titre: this._inputTitleElement.value,
      description: this._textAreaDescriptionElement.value
    };
    this.props.updateTodo(updateItem);
    this.props.history.push("/");
  };

  addItem = e => {
    e.preventDefault();
    var newItem = {
      _id:
        "_" +
        Math.random()
          .toString(36)
          .substr(2, 9),
      titre: this._inputTitleElement.value,
      description: this._textAreaDescriptionElement.value
    };
    this.props.addTodo(newItem);
    this.props.history.push("/");
  };

  componentDidMount() {
    // On utilse la méthode componentDidMount pour préremplir les champ input après avoir cliqué sur todo
    if (this.isIdParamEntered()) {
      this.setState({
        inputTitleValue: this.getItem().titre
      });
    }
  }

  handleTitleChange = e => {
    this.setState({
      inputTitleValue: e.target.value
    });
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
              onChange={e => this.handleTitleChange(e)}
            ></input>
            <textarea
              placeholder="Enter a description"
              ref={a => (this._textAreaDescriptionElement = a)}
            >
              {isIdParamEntered ? item.description : ""}
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
