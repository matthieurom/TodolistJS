import React from "react";
import FlipMove from "react-flip-move";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

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

  handleModifyDescription = () => {};

  handleCloseDescription;

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
                <button onClick={this.handleModifyDescription}>
                  Modify task
                </button>
              </Link>
            </div>
          </div>
        </div>
        <span
          className="deleterTask"
          onClick={() => this.props.onDelete(item._id)}
        >
          <FontAwesomeIcon icon={faTrash} />{" "}
        </span>
      </li>
    );
  };
  render() {
    console.log("Props in TodoItems : ", this.props);
    var todoEntries = this.props.entries;
    var listItems = todoEntries
      .filter(item => item.titre.includes(this.props.value))
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

export default connect(mapStateToProps)(TodoItems);
