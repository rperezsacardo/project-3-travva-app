import React, { Component } from "react";
import { signIn } from "./../../../services/authentication";
import { Form, Button, Container } from "react-bootstrap";

class SignIn extends Component {
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
    signIn({ email, password })
      .then((user) => {
        this.props.updateUser(user);
        this.props.history.push(`/user/${user._id}`);
      })
      .catch((error) => console.log(error));
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

          <Button variant="success" type="submit">
            Login
          </Button>
        </Form>
      </Container>
    );
  }
}

export default SignIn;
