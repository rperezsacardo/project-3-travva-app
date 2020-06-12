import React, { Component } from "react";
import NavBar from "./../../Components/NavBar";
import SinglePlace from "./../../Components/SinglePlace";
import Trip from "./../../Components/Trip";
import Day from "./../../Components/Day";
import { getPlaceInformation } from "./../../services/places";
import { getDayPlaces, newPlace, removePlace } from "./../../services/day";
import { Container, Row, Col, Form, Breadcrumb, Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";

class SinglePlaceView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: null,
      userPlaces: null,
      bookmarked: null
    };
  }
  componentDidMount = () => {
    this.updatePlaces();
    this.checkPlaceBookMarked();
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

  addPlace = (placeId) => {
    const { id, tripId, day } = this.props.match.params;
    this.placeBookmarked();
    newPlace({ id, tripId, day, placeId })
      .then((result) => this.updatePlaces())
      .catch((error) => console.log(error));
  };

  removePlace = (placeId) => {
    const { id, tripId, day } = this.props.match.params;
    this.placeBookmarked();
    removePlace({ id, tripId, day, placeId })
      .then((result) => this.updatePlaces())
      .catch((error) => console.log(error));
  };

  checkPlaceBookMarked = () => {
    const { id, tripId, day, placeId } = this.props.match.params;
    const userPlaces = this.state.userPlaces;
    let result;
    if (userPlaces) {
      const filterPlaces = userPlaces.filter((place) => place.placeId === placeId);
      result = filterPlaces.lenght ? true : false;
    }
    this.setState({
      bookmarked: result
    });
  };

  placeBookmarked = () => {
    this.setState({
      bookmarked: !this.state.bookmarked
    });
  };

  render() {
    const placeInfo = this.state.place;
    const allPlaces = this.state.places;
    const userPlaces = this.state.userPlaces;
    const { id, tripId, day, placeId } = this.props.match.params;

    return (
      <div>
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
          <Breadcrumb.Item>
            <Link to={`/user/${id}/${tripId}/${day}`}>{`Day ${day}`}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Place</Breadcrumb.Item>
        </Breadcrumb>

        <SinglePlace
          {...this.props}
          bookmarked={this.state.bookmarked}
          removePlace={this.removePlace}
          addPlace={this.addPlace}
        />
      </div>
    );
  }
}

export default SinglePlaceView;
