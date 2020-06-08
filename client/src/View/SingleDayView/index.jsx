import React, { Component } from "react";
import NavBar from "./../../Components/NavBar";
import Place from "./../../Components/Place";
import Trip from "./../../Components/Trip";
import Day from "./../../Components/Day";

class SingleDayView extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <h1>SingleDayView</h1>
        <h1>Map over Google api</h1>
        <Day />
      </div>
    );
  }
}

export default SingleDayView;
