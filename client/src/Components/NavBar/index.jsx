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
        <Navbar.Brand>
          {" "}
          {/*menu items for all users*/}
          <Link to="/">
            <img src="travva-navbar.png" height="29px" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link>
              <Link className="white" to="/">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="white" to="/authentication/sign-in">
                Sign In
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="white" to="/authentication/sign-up">
                Sign Up
              </Link>
            </Nav.Link>
            {this.props.user && (
              <>
                {" "}
                {/*dropdown for logged-in users only*/}
                <NavDropdown className="white" title="Account" id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <Link to={`/user/${this.props.user._id}`}>My Profile</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/user/:id/:tripId/:day">My Trips</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={this.signOutAndDeleteSession}>
                    <Link to="/">Sign Out</Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
