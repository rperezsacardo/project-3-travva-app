import React, { Component } from "react";
import { getAllPlacesFromApi } from "../../services/places";
import { signOut, loadUserInfo } from "./../../services/authentication";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { Link, Switch, Route } from "react-router-dom";
import "./NavBar.css";

export class NavBar extends Component {
  constructor(props) {
    super(props);
    //console.log("Constructor method ran");
    this.state = {
      query: "",
      user: null
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

  signOutAndDeleteSession = () => {
    signOut()
      .then(() => {
        this.props.updateUser();
        //this.props.history.push("/");
      })
      .catch();
  };

  componentDidMount = () => {
    if (!this.props.user)
      loadUserInfo()
        .then((user) => {
          console.log(user);
          this.updateUser(user);
        })
        .catch((error) => console.log(error));
  };

  updateUser = (user) => {
    this.setState({
      userId: user._id
    });
  };

  render() {
    return (
      <Navbar className="NavBar" expand="lg" variant="white">
        <Navbar.Brand href="/">
          <img src="travva-navbar.png" height="29px" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {this.props.user && (
              <>
                <NavDropdown title="Account" id="basic-nav-dropdown">
                  <NavDropdown.Item href={`user/${this.props.user._id}`}>
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/user/:id/:tripId/:day">My Trips</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4" onClick={this.signOutAndDeleteSession}>
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
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
            <Button variant="outline-secondary">+</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
