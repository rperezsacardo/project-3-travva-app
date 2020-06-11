import React, { Component, useState } from "react";
import NavBar from "./../../Components/NavBar";
import Place from "./../../Components/Place";
import Trip from "./../../Components/Trip";
import Day from "./../../Components/Day";
import { getAllPlacesFromApi } from "../../services/places";
import { getDayPlaces, newPlace } from "./../../services/day";
import { Container, Row, Col, Form } from "react-bootstrap";

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
    const { id, tripId, day } = this.props.match.params;
    console.log(id, tripId, day);
    this.updatePlaces();
  }

  handleFormSubmission = (event) => {
    event.preventDefault();
    const { query } = this.state;
    // console.log(`Query: ${query}`);
    getAllPlacesFromApi(query)
      .then((result) => {
        console.log(result);
        const newPlaces = result.places;
        this.setState({
          places: [...newPlaces]
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
        console.log("result", userPlaces);
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
    console.log("nem place");
    newPlace({ id, tripId, day, placeId })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  render() {
    const allPlaces = this.state.places;
    console.log(this.state.userPlaces);
    return (
      <div>
        <Form onSubmit={this.handleFormSubmission}>
          <label>Search Form</label>
          <input
            name="query"
            id="search-input"
            type="text"
            placeholder="Search for a city..."
            value={this.state.query} //query passed into search bar
            onChange={this.handleInputChange}
            autoComplete="on"
          />
          <button>🔎</button>
        </Form>
        <div>
          <h1>
            <button>Test Places</button>
          </h1>
        </div>
        <div>
          {allPlaces && (
            <Container>
              <Row>
                <>
                  {allPlaces.map((place) => {
                    return (
                      <Col sm={4} className="mb-5">
                        <Place {...place} addPlace={this.addPlace} />
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
