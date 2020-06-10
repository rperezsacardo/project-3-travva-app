import React, { Component } from "react";
import NavBar from "./../../Components/NavBar";
import Place from "./../../Components/Place";
import Trip from "./../../Components/Trip";
import Day from "./../../Components/Day";
import { getAllTripsFromUser, createTrip } from "./../../services/trip";
import { Card, Button, Badge, Container, Row, Col } from "react-bootstrap";

class UserView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: null
    };
  }

  componentDidMount = () => {
    const user = this.props.match.params.id;
    getAllTripsFromUser({ user })
      .then((result) => {
        console.log("result >>>>>>>>", result);

        this.setState({
          trips: result
        });
        console.log(typeof allTrips);
      })
      .catch((error) => console.log(error));
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
    const allTrips = this.state.trips;
    //console.log("state", this.state.trips);
    return (
      <div>
        <h2>User View</h2>
        <button onClick={this.newTrip}>New trip</button>
        {allTrips && (
          <>
            {allTrips.map((trip) => {
              return <Trip {...trip} />;
            })}
          </>
        )}
      </div>
    );
  }
}

export default UserView;

//<Container>
//<Row>
//</Row>
//</Container>
//<Col sm={4} className="mb-5">
//</Col>

// {allTrips && (
//   <>
//     {allTrips.map((trip) => {
//       return <Trip {...trip} />;
//     })}
//   </>
// )}
