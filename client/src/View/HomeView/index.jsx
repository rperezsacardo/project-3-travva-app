import React, { Component } from "react";
import NavBar from "./../../Components/NavBar";
import Place from "./../../Components/Place";
import Trip from "./../../Components/Trip";
import Day from "./../../Components/Day";
import index from "./index.css";
import { Link } from "react-router-dom";

import { Jumbotron, Button, Container, Row, Col } from "react-bootstrap";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

class HomeView extends Component {
  render() {
    return (
      <div>
        <Jumbotron fluid className="pl-3 pr-1">
          <h1>Your world, discovered.</h1>
          <p>
            With Travva, your trip planning will be as enjoyable as the journey itself. Click the
            button below to get started.
          </p>
          <p>
            <Button variant="success">
              <Link className="white" to="/authentication/sign-up">
                Sign up
              </Link>
            </Button>
          </p>
        </Jumbotron>

        <Container className="paddings">
          <Row>
            <Col className="card-img">
              <img src="card1.png" />
            </Col>
            <Col className="card-img">
              <img src="card2.png" />
            </Col>
            <Col className="card-img">
              <img src="card3.png" />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default HomeView;
