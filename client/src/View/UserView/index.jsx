import React, { Component } from "react";
import NavBar from "./../../Components/NavBar";
import Place from "./../../Components/Place";
import Trip from "./../../Components/Trip";
import Day from "./../../Components/Day";
import { getAllTripsFromUser, createTrip } from "./../../services/trip";
class UserView extends Component {
  render() {
    console.log(this.props.match.params);
    const user = this.props.match.params.id;
    return (
      <div>
        <NavBar />
        <h1>User View</h1>
        <button onClick={() => createTrip(user)}>New trip</button>
      </div>
    );
  }
}

export default UserView;
