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
    const user = this.props.match.params.id;
    getAllTripsFromUser({ user })
      .then((result) => {
        this.setState({
          trips: [...result]
        });
      })
      .catch((error) => console.log(error));
  };
  newTrip = () => {
    // console.log("all", this.props.match.params);
    const user = this.props.match.params.id;
    createTrip(user)
      .then((result) => {
        console.log("result >>>>>>>>", result);
      })
      .catch((error) => console.log(error));
  };
  render() {
    console.log(this.props);
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
