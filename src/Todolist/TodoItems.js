import React from "react";
import FlipMove from "react-flip-move";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteTodo } from "../actions/todoActions";
import axios from "axios";

class TodoItems extends React.Component {
  state = {
    openItem: null // Fera référence à l'item cliqué
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
    console.log("Props in onDeleteTodo :", this.props);
    const response = await axios.delete(`http://localhost:8080/${item._id}`);
    this.props.deleteTodo(response.data);
  };

  renderTask = item => {
    return (
      <li key={item._id}>
        <div
          // Si openItem est égal à l'item en question (celui cliqué) alors on affiche al description
          className={this.state.openItem === item ? "item open" : "item"}
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
    var todoEntries = this.props.entries; // Permet de récupérer les items
    var listItems = todoEntries
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
  deleteTodo: deleteTodo
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(TodoItems);
