import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { connect } from "react-redux";
import axios from "axios";

class Login extends React.Component {
  state = {
    inputLoginValue: "",
    inputPasswordValue: "",
    isPasswordIncorrect: false
  };

  handleLoginChange = e => {
    this.setState({
      inputLoginValue: e.target.value
    });
  };

  handlePasswordChange = e => {
    this.setState({
      inputPasswordValue: e.target.value
    });
  };

  handleLogin = async e => {
    e.preventDefault();
    var response = null;
    try {
      response = await axios.post(`http://localhost:8080/login`, {
        login: this.state.inputLoginValue,
        password: this.state.inputPasswordValue
      });
      localStorage.setItem("token", response.data);
      this.props.history.push("/");
    } catch {
      this.setState({
        isPasswordIncorrect: true
      });
    }
  };

  render() {
    return (
      <div className="loginMain">
        <div className="form-content">
          <h1>Todolist App</h1>
          <h2>Login</h2>
          <form onSubmit={e => this.handleLogin(e)}>
            <label>
              <input
                placeholder="Login"
                value={this.state.inputLoginValue}
                onChange={e => this.handleLoginChange(e)}
              />
            </label>
            <input
              placeholder="Password"
              type="password"
              value={this.state.inputPasswordValue}
              onChange={e => this.handlePasswordChange(e)}
            />
            {this.state.isPasswordIncorrect ? (
              <p className="incorrect-password">
                Password or login not correct
              </p>
            ) : (
              ""
            )}
            <div className="form-content-button">
              <Link to="/register">
                <p>Sign up</p>
              </Link>
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Login);
