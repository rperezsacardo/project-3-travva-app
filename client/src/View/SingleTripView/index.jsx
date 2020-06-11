import React, { Component } from "react";
import NavBar from "./../../Components/NavBar";
import Place from "./../../Components/Place";
import Trip from "./../../Components/Trip";
import Day from "./../../Components/Day";
import { Route, Link, Switch } from "react-router-dom";
import { getSingleTrip } from "./../../services/trip";
import { newDay, getDays } from "./../../services/day";
class SingleTripView extends Component {
  constructor() {
    super();
    this.state = {
      trip: null,
      allDays: []
    };
  }
  componentWillMount = () => {
    const { id, tripId } = this.props.match.params;
    getDays({ id, tripId })
      .then((result) => {
        this.setState({
          trip: result,
          allDays: result.allDays
        });
      })
      .catch((error) => console.log(error));
  };

  componentDidMount = () => {
    console.log("mount");
    const { id, tripId } = this.props.match.params;
  };

  AddDay = () => {
    const { id, tripId } = this.props.match.params;
    newDay({ id, tripId })
      .then((trip) => {
        this.setState({
          allDays: [trip.allDays]
        });
      })
      .catch((error) => console.log(error));
  };

  render() {
    console.log("here", this.state.allDays);
    const { id, tripId } = this.props.match.params;
    const days = this.state.allDays; //this.props.day
    return (
      <div>
        <NavBar />
        <h1>SingleTripView</h1>
        <ul>
          {(days.length && (
            <>
              {days.map((day, index) => {
                return (
                  <li>
                    <Day {...day} />
                    <h5>Day {index + 1}</h5>
                    <button>
                      <Link to={`/user/${id}/${tripId}/${index + 1}`}> This Day</Link>
                    </button>
                  </li>
                );
              })}
              }{" "}
            </>
          )) || <> {<button onClick={this.AddDay}>Add your first day </button>}</>}
          <Day />
        </ul>

        <button onClick={this.AddDay}>New day</button>
      </div>
    );
  }
}

export default SingleTripView;
