import React, { Component } from "react";
import NavBar from "./../../Components/NavBar";
import Place from "./../../Components/Place";
import Trip from "./../../Components/Trip";
import Day from "./../../Components/Day";
import { getAllTripsFromUser, createTrip } from "./../../services/trip";
class UserView extends Component {
  constructor() {
    super();
    this.state = {
      trips: null
    };
  }

  componentDidMount = () => {
    this.allTrips();
  };

  newTrip = () => {
    // console.log("all", this.props.match.params);
    const user = this.props.match.params.id;
    createTrip(user)
      .then((result) => this.allTrips())
      .catch((error) => console.log("error", error));
  };

  allTrips = () => {
    const user = this.props.match.params.id;
    getAllTripsFromUser({ user })
      .then((result) => {
        console.log("result >>>>>>>>", result);
        this.setState({
          trips: result
        });
      })
      .catch((error) => console.log(error));
  };

  render() {
    console.log("state", this.state.trips);
    return (
      <div>
        {/* <NavBar /> */}
        <h1>User View</h1>

        <button onClick={this.newTrip}>New trip</button>
      </div>
    );
  }
}

export default UserView;
