import React from "react";
import TodoItems from "./TodoItems";
import "./Todolist.css";
import { Link } from "react-router-dom";

class Todolist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          _id: "key1",
          titre: "test1",
          description: "description1",
          done: false
        },
        {
          _id: "key2",
          titre: "test2",
          description: "description2",
          done: false
        }
      ]
    };
  }

  delete = key => {
    this.setState({
      items: this.state.items.filter(item => item._id !== key)
    });
  };

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
    console.log("render");
    return (
      <div className="todolistMain">
        <div className="header">
          <form onSubmit={this.addItem}>
            <input
              placeholder="Enter a task"
              ref={a => (this._inputElement = a)}
            ></input>
            <button type="submit">Add Task</button>
            <button onClick={() => this.setState({ items: [] })}>
              Delete tasks
            </button>
          </form>
        </div>
        <TodoItems entries={this.state.items} onDelete={this.delete} />
        <button>
          <Link to="/create">New task</Link>
        </button>
      </div>
    );
  }
}

export default Todolist;
