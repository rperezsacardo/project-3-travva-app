import React, { Component } from "react";
import NavBar from "./../../Components/NavBar";
import Place from "./../../Components/Place";
import Trip from "./../../Components/Trip";
import Day from "./../../Components/Day";

class SingleTripView extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <h1>SingleTripView</h1>
        <Trip />
      </div>
    );
  }
}

export default SingleTripView;
