import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import axios from "axios";

class Signup extends React.Component {
  state = {
    inputLoginValue: "",
    inputPasswordValue: "",
    inputPasswordValueVerif: "",
    isPasswordIncorrect: false
  };

  // Vérifie si l'utilisateur est connecté, si oui alors redirection vers la liste des todo
  componentWillMount() {
    if (localStorage.getItem("token")) {
      this.props.history.push("/");
    }
  }

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

  handlePasswordVerifChange = e => {
    this.setState({
      inputPasswordValueVerif: e.target.value
    });
  };

  passwordVerification = () => {
    if (this.state.inputPasswordValue !== this.state.inputPasswordValueVerif) {
      this.setState({ isPasswordIncorrect: true });
      return false;
    }
    return true;
  };

  handleSignup = async e => {
    e.preventDefault();
    if (
      this.passwordVerification() &&
      this.state.inputLoginValue !== "" &&
      this.state.inputPasswordValue !== "" &&
      this.state.inputPasswordValueVerif !== ""
    ) {
      let newUser = {
        login: this.state.inputLoginValue,
        password: this.state.inputPasswordValue
      };
      try {
        const responseCreateUser = await axios.post(
          "http://localhost:8080/register",
          newUser
        );
        console.log("User created is :", console.log(responseCreateUser));
      } catch {
        console.log("ERROR IN LOGIN");
      }
      var response = null;
      try {
        response = await axios.post(`http://localhost:8080/login`, {
          login: this.state.inputLoginValue,
          password: this.state.inputPasswordValue
        });
        localStorage.setItem("token", response.data);
        this.props.history.push("/");
      } catch {
        console.log("ERROR IN LOGIN AFTER SIGNUP");
      }
    }
  };

  render() {
    return (
      <div className="SignupMain">
        <div className="form-content">
          <h1>Todolist App</h1>
          <h2>Create you account !</h2>
          <form onSubmit={e => this.handleSignup(e)}>
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
            <input
              placeholder="Password verification"
              type="password"
              value={this.state.inputPasswordValueVerif}
              onChange={e => this.handlePasswordVerifChange(e)}
            />
            {this.state.isPasswordIncorrect ? (
              <p className="incorrect-password">
                Login already exists or passwords does not match
              </p>
            ) : (
              ""
            )}
            <div className="form-content-button">
              <Link to="/login">
                <p>Back to login</p>
              </Link>
              <button type="submit">Signup</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
