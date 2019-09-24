import React from "react";
import TodoItems from "./TodoItems";
import "./index.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Todolist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

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
