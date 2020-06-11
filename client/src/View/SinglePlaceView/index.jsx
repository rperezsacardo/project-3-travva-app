import React, { Component } from "react";
import NavBar from "./../../Components/NavBar";
import Place from "./../../Components/Place";
import Trip from "./../../Components/Trip";
import Day from "./../../Components/Day";
import { Container, Row, Col, Form, Breadcrumb, Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";

class SinglePlaceView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const allPlaces = this.state.places;
    const userPlaces = this.state.userPlaces;
    const { id, tripId, day } = this.props.match.params;
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

        <h1>SinglePlaceView</h1>
        <Place {...this.props} />
      </div>
    );
  }
}

export default withRouter(SinglePlaceView);
