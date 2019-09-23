import React from "react";
import TodoItems from "./TodoItems";
import "./index.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Todolist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          _id: "key1",
          titre: "test1",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          done: false
        },
        {
          _id: "key2",
          titre: "test2",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
          done: false
        },
        {
          _id: "key3",
          titre: "Faire les courses",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          done: false
        }
      ],
      value: ""
    };
  }

  delete = key => {
    this.setState({
      items: this.state.items.filter(item => item._id !== key)
    });
  };

  handleChangeInput = e => {
    this.setState({
      value: e.target.value
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
          <h1>Todolist</h1>
          <div className="header_display">
            <input
              placeholder="Search a task"
              onChange={e => this.handleChangeInput(e)}
            ></input>
            <Link to="/create">
              <button>New task</button>
            </Link>
          </div>
        </div>
        <TodoItems
          entries={this.props.items}
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

export default connect(mapStateToProps)(Todolist);
