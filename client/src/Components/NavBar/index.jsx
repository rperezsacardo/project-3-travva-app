import React, { Component } from "react";
import { getAllPlacesFromApi } from "../../services/places";
import { signOut } from "./../../services/authentication";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { Link, Switch, Route } from "react-router-dom";

export class NavBar extends Component {
  constructor(props) {
    super(props);
    //console.log("Constructor method ran");
    this.state = {
      query: ""
    };
  }

  handleFormSubmission = (event) => {
    event.preventDefault();
    const { query } = this.state;
    console.log(`Query: ${query}`);
    getAllPlacesFromApi(query)
      .then((result) => {
        //console.log(result);
        this.setState({
          places: [...result]
        });
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
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Brand Image</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Trips</Nav.Link>
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Sign Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline onSubmit={this.handleFormSubmission}>
            <FormControl
              name="query"
              id="search-input"
              type="text"
              placeholder="Search a city"
              className="mr-sm-2"
              value={this.state.query}
              onChange={this.handleInputChange}
              autoComplete="on"
            />
            <Button variant="outline-success">🔎</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
