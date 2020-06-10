import React, { Component } from "react";
import NavBar from "./../../Components/NavBar";
import Place from "./../../Components/Place";
import Trip from "./../../Components/Trip";
import Day from "./../../Components/Day";
import index from "./index.css";
import { Link } from "react-router-dom";

import { Jumbotron, Button, Container, Row, Col } from "react-bootstrap";

class HomeView extends Component {
  render() {
    return (
      <div>
        <Jumbotron fluid className="pl-3 pr-1">
          <h1>Your world, discovered.</h1>
          <p>
            With Travva, you can take your travels to the next level. Click the button below to get
            started.
          </p>
          <p>
            <Button variant="success">
              <Link className="white" to="/authentication/sign-up">
                Sign up
              </Link>
            </Button>
          </p>
        </Jumbotron>
        <Container>
          <Row className="pt-1 pb-5">
            <Col className="pt-5">
              <img src="card1.png" />
            </Col>
            <Col className="pt-5">
              <img src="card2.png" />
            </Col>
            <Col className="pt-5">
              <img src="card3.png" />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default HomeView;
