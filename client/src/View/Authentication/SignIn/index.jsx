import React, { Component } from "react";
import { signUp, signIn } from "./../../../services/authentication";
//import { authenticationService } from "../../../services/authentication"

class SignIn extends Component {
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
    signIn({ email, password })
      .then((user) => {
        this.props.updateUser(user);
        this.props.history.push("/");
      })
      .catch((error) => console.log(error));
    alert(`Person with the email ${email} and the password ${password} has signed up.`);
    // do something here, set state?
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="App">
        <h2>Sign In</h2>
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

          <button>Sign In</button>
        </form>
      </div>
    );
  }
}

export default SignIn;

//if good, duplicate for sign-in
