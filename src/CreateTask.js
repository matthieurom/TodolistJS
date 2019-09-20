import React from "react";
import { Link } from "react-router-dom";

export default class CreateTask extends React.Component {
  render() {
    return (
      <div className="header">
        <form onSubmit={this.addItem}>
          <input
            placeholder="Enter a task name"
            ref={a => (this._inputElement = a)}
          ></input>
          <textarea>Enter a description</textarea>
          <button type="submit">Add Task</button>
        </form>
        <button>
          <Link to="/todolist">Back to Todolist</Link>
        </button>
      </div>
    );
  }
}
