import React, { Component } from "react";
import NavBar from "./../../Components/NavBar";
import Place from "./../../Components/Place";
import Trip from "./../../Components/Trip";
import Day from "./../../Components/Day";

import { getAllTripsFromUser, createTrip, serviceDeleteTrip } from "./../../services/trip";
import { Card, Button, Badge, Container, Row, Col, Breadcrumb } from "react-bootstrap";
import "./index.css";
import { Link } from "react-router-dom";

class UserView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      alert: null
    };
  }

  // componentDidUpdate = (prevProps, prevState, snapshot) => {
  //   console.log("will");
  //   if (prevState.trips !== prevProps.trips) {
  //     console.log("if");
  //     this.allTrips();
  //   }
  // };

  componentDidMount = () => {
    this.allTrips();
  };

  newTrip = () => {
    const user = this.props.match.params.id;
    createTrip(user)
      .then((result) => {
        this.allTrips();
      })
      .catch((error) => console.log("error", error));
  };

  allTrips = () => {
    const user = this.props.match.params.id;
    getAllTripsFromUser({ user })
      .then((result) => {
        this.setState({
          trips: [...result]
        });
      })
      .catch((error) => console.log(error));
  };

  deleteTrip = (tripId) => {
    console.log(tripId);
    serviceDeleteTrip(tripId)
      .then((result) => {
        this.allTrips();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    let tripId;
    console.log(this.props.user);
    const allTrips = this.state.trips;

    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Profile</Breadcrumb.Item>
        </Breadcrumb>

        <div className="profile">
          {(this.props.user && (
            <h2 className="mt-3 ml-3 mb-3">Howdy, {this.props.user.name}!</h2>
          )) || <h2 className="mt-3 ml-3 mb-3">Howdy, travver!</h2>}
          <Button className="mb-4 ml-3 shadow-sm" variant="light" onClick={this.newTrip}>
            Create trip
          </Button>
        </div>
        {this.state.trips && (
          <>
            {allTrips.map((trip, index) => {
              return <Trip {...trip} index={index} deleteTrip={this.deleteTrip} />;
            })}
          </>
        )}
      </div>
    );
  }
}

export default UserView;
