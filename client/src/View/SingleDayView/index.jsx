import React, { Component, useState } from "react";
import NavBar from "./../../Components/NavBar";
import Place from "./../../Components/Place";
import Trip from "./../../Components/Trip";
import Day from "./../../Components/Day";
import { getAllPlacesFromApi } from "../../services/places";
import { getDayPlaces, newPlace, removePlace } from "./../../services/day";
import { Container, Row, Col, Form, Breadcrumb, Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import './index.css'

class SingleDayView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      places: null,
      userPlaces: null
    };
  }

  componentDidMount() {
    this.updatePlaces();
  }

  handleFormSubmission = (event) => {
    event.preventDefault();
    const { query } = this.state;
    getAllPlacesFromApi(query)
      .then((result) => {
        const newPlaces = result.places;
        this.setState({
          places: newPlaces
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

  updatePlaces = () => {
    const { id, tripId, day } = this.props.match.params;
    getDayPlaces({ id, tripId, day })
      .then((userPlaces) => {
        this.setState({
          userPlaces: userPlaces.dayPlan
        });
      })
      .catch((error) => console.log("error", error));
  };

  showPlaces = () => {
    const allPlaces = this.state.places;
  };

  addPlace = (placeId) => {
    const { id, tripId, day } = this.props.match.params;
    newPlace({ id, tripId, day, placeId })
      .then((result) => this.updatePlaces())
      .catch((error) => console.log(error));
  };

  removePlace = (placeId) => {
    const { id, tripId, day } = this.props.match.params;
    removePlace({ id, tripId, day, placeId })
      .then((result) => this.updatePlaces())
      .catch((error) => console.log(error));
  };

  render() {
    const allPlaces = this.state.places;
    const userPlaces = this.state.userPlaces;
    const { id, tripId, day } = this.props.match.params;
    //console.log(userPlaces);

    return (
      <div className="mb-3 pb-5">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={`/user/${id}`}>Profile</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={`/user/${id}/${tripId}`}>Trip</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{`Day ${day}`}</Breadcrumb.Item>
        </Breadcrumb>
        <Container className="mb-4">
          <Form onSubmit={this.handleFormSubmission}>
            <Form.Control
              size="lg"
              name="query"
              id="search-input"
              type="text"
              placeholder="Enter 'Lisbon', 'Berlin', etc."
              value={this.state.query}
              onChange={this.handleInputChange}
              autoComplete="on"
            />
            <br />
            <Button variant="success" type="submit" size="lg">
              🔎 Explore Places
            </Button>
          </Form>
        </Container>

        <div>
          {userPlaces && (
            <Container>
              {userPlaces.length > 0 && <h2>Your saved places:</h2>}
              <br />
              <br />
              <Row>
                <>
                  {userPlaces.map((place) => {
                    return (
                      <Col sm={4} className="mb-5">
                        <Place
                          {...place}
                          {...this.props.match.params}
                          removePlace={this.removePlace}
                        />
                      </Col>
                    );
                  })}
                </>
              </Row>
            </Container>
          )}
        </div>

        <div>
          {this.state.places && (
            <Container>
              <h2 className="mb-2">Things to do in {this.state.query}:</h2>
              <br />
              <br />
              <Row>
                <>
                  {this.state.places.map((place) => {
                    return (
                      <Col sm={4} className="mb-5">
                        <Place {...place} {...this.props.match.params} addPlace={this.addPlace} />
                      </Col>
                    );
                  })}
                </>
              </Row>
            </Container>
          )}
        </div>
      </div>
    );
  }
}

export default SingleDayView;
