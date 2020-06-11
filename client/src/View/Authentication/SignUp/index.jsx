import React, { Component } from "react";
import { signUp, signIn } from "./../../../services/authentication";
//import { authenticationService } from "../../../services/authentication"
import { Form, Button, Container } from "react-bootstrap";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }

  handleFormSubmission = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    signUp({ email, password })
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
      <Container md="auto" className="mt-5">
        <Form fluid className="Form" onSubmit={this.handleFormSubmission}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="name"
              type="name"
              placeholder="Enter Username"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Agree to Terms and Conditions" />
          </Form.Group>

          <Button variant="success" type="submit">
            Create Account
          </Button>
        </Form>
      </Container>
    );
  }
}

export default SignUp;

//if good, duplicate for sign-in
