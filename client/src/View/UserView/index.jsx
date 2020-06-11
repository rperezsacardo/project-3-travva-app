import React, { Component } from "react";
import NavBar from "./../../Components/NavBar";
import Place from "./../../Components/Place";
import Trip from "./../../Components/Trip";
import Day from "./../../Components/Day";
import { getAllTripsFromUser, createTrip } from "./../../services/trip";
import { Card, Button, Badge, Container, Row, Col } from "react-bootstrap";
import "./index.css";

class UserView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: []
    };
  }

  componentDidMount = () => {
    this.allTrips();
  };

  newTrip = () => {
    const user = this.props.match.params.id;
    console.log("new trip created");
    createTrip(user)
      .then((result) => {
        console.log(result);
        this.allTrips();
      })
      .catch((error) => console.log("error", error));
  };

  allTrips = () => {
    const user = this.props.match.params.id;
    getAllTripsFromUser({ user })
      .then((result) => {
        console.log(result);
        this.setState({
          trips: [...result]
        });
        console.log(this.state.trips.length);
      })
      .catch((error) => console.log(error));
  };

  render() {
    const allTrips = this.state.trips;

    return (
      <div>
        <div className="profile">
          <h2 className="mt-3 ml-3 mb-3">Hello, User.</h2>
          <Button className="mb-4 ml-3 shadow-sm" variant="light" onClick={this.newTrip}>
            Create trip
          </Button>
        </div>
        {this.state.trips && (
          <>
            {allTrips.map((trip, index) => {
              return <Trip {...trip} index={index} />;
            })}
          </>
        )}
      </div>
    );
  }
}

export default UserView;
