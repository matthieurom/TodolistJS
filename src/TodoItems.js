import React from "react";
import FlipMove from "react-flip-move";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

class TodoItems extends React.Component {
  createTasks = item => {
    return (
      <li key={item._id}>
        <div className="item">{item.titre}</div>
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
    var todoEntries = this.props.entries;
    var listItems = todoEntries.map(this.createTasks);

    return (
      <ul className="listItems">
        <FlipMove duration={250} easing="ease-out">
          {listItems}
        </FlipMove>
      </ul>
    );
  }
}

export default TodoItems;
