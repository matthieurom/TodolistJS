import React from "react";
import FlipMove from "react-flip-move";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteTodo, updateTodo } from "../actions/todoActions";
import axios from "axios";

class TodoItems extends React.Component {
  state = {
    openItem: null // Fera référence à l'item cliqué
  };

  handleCheckTask = item => {
    console.log("done is :", item.done);
    let updateItem = {
      ...item,
      done: !item.done
    };
    axios
      .patch(`http://localhost:8080/todo/${item._id}`, updateItem, {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(response => this.props.updateTodo(response.data));
  };

  handleOpenDescription = item => {
    this.setState({
      openItem: item
    });
  };

  handleCloseDescription = e => {
    e.stopPropagation(); // Empeche la propagation du click jusqu'à l'element au dessus (qui est notre div ici et donc on ouvré puis fermé )
    this.setState({
      openItem: null
    });
  };

  onDeleteTodo = async item => {
    const response = await axios.patch(
      `http://localhost:8080/todo/delete/${item._id}`,
      [],
      {
        headers: { Authorization: localStorage.getItem("token") }
      }
    );

    this.props.deleteTodo(response.data.todos);
  };

  renderTask = item => {
    let className = "item";
    if (this.state.openItem === item) {
      className = className + " open";
    }
    if (item.done) {
      className = className + " task_checked";
    }
    return (
      <li key={item._id}>
        <div
          className={item.done ? "checkTask checked" : "checkTask"}
          onClick={() => this.handleCheckTask(item)}
        >
          <FontAwesomeIcon icon={faCheck} />
        </div>
        <div
          // Si openItem est égal à l'item en question (celui cliqué) alors on affiche al description
          className={className}
          onClick={() => this.handleOpenDescription(item)}
        >
          <div className="item-titre">{item.titre}</div>
          <div className="item-description">
            <p>{item.description}</p>
            <div className="item-buttons">
              <button onClick={this.handleCloseDescription}>
                Close description
              </button>
              <Link to={`/update/${item._id}`}>
                <button>Modify task</button>
              </Link>
            </div>
          </div>
        </div>
        <span className="deleterTask" onClick={() => this.onDeleteTodo(item)}>
          <FontAwesomeIcon icon={faTrash} />{" "}
        </span>
      </li>
    );
  };
  render() {
    console.log("ENTRIES IN TODOITEMS :", this.props.todos);
    var listItems = this.props.todos
      .filter(item => item.titre.includes(this.props.value)) // .filter pour filtrer p/rapport au input tapé dans searchbar
      .map(this.renderTask);

    return (
      <ul className="listItems">
        <FlipMove duration={250} easing="ease-out">
          {listItems}
        </FlipMove>
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapActionsToProps = {
  updateTodo: updateTodo,
  deleteTodo: deleteTodo
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(TodoItems);
