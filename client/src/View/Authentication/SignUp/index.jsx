import React, { Component } from "react";
import NavBar from "../../../Components/NavBar";
import Place from "../../../Components/Place";
import Trip from "../../../Components/Trip";
import Day from "../../../Components/Day";
import { signUp, signIn } from "./../../../services/authentication";
//import { authenticationService } from "../../../services/authentication"

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  handleFormSubmission = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    signUp({ email, password })
      .then((user) => {
        console.log(user);
        this.props.history.push("/");
      })
      .catch((error) => console.log(error));
    alert(`Person with the email ${email} and the password ${password} has signed up.`);
    // do something here, set state?
  };

  handleInputChange = (event) => {
    const $inputDomNode = event.target;

    const inputNameAttribute = $inputDomNode.name;
    const value = $inputDomNode.value;

    this.setState({
      [inputNameAttribute]: value
    });
  };

  render() {
    return (
      <div className="App">
        <h2>Sign up</h2>
        <form onSubmit={this.handleFormSubmission}>
          <input
            name="email"
            type="email"
            placeholder="create email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />

          <input
            name="password"
            placeholder="create password"
            type="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />

          <button>Create Account</button>
        </form>
      </div>
    );
  }
}

export default SignUp;

//if good, duplicate for sign-in