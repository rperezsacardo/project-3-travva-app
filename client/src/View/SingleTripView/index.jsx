import React, { Component } from "react";
import NavBar from "./../../Components/NavBar";
import Place from "./../../Components/Place";
import Trip from "./../../Components/Trip";
import Day from "./../../Components/Day";
import { Route, Link, Switch } from "react-router-dom";
import { getSingleTrip } from "./../../services/trip";
import { newDay, getDays } from "./../../services/day";
import { Button, Breadcrumb, Media } from "react-bootstrap";

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
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={`/user/${this.props.match.params.id}`}>Profile</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Trip</Breadcrumb.Item>
        </Breadcrumb>

        <div className="profile">
          <h2 className="mt-3 ml-3 mb-3">My Trip</h2>
          <Button className="mb-4 ml-3 shadow-sm" variant="light" onClick={this.AddDay}>
            Add Day
          </Button>
        </div>

        {(days.length && (
          <>
            {days.map((day, index) => {
              return (
                <Media className="ml-3 mb-4">
                  <img
                    width={64}
                    height={64}
                    className="mr-3"
                    src="https://meustc.com/wp-content/uploads/2020/01/placeholder-1.png"
                    alt="Generic placeholder"
                  />
                  <Media.Body>
                    <Day {...day} day={this.AddDay} index={index} />
                    <h5>Day {index + 1}</h5>
                    <ul className="text-secondary less-width">
                      <li>Place #1</li>
                      <li>Place #2</li>
                      <li>Place #3</li>
                    </ul>
                    <Button variant="success">
                      <Link className="white" to={`/user/${id}/${tripId}/${index + 1}`}>
                        Plan Day
                      </Link>
                    </Button>
                  </Media.Body>
                </Media>
              );
            })}
          </>
        )) || <> </>}
      </div>
    );
  }
}

export default SingleTripView;
