import React, { Component } from "react";
import NavBar from "./../../Components/NavBar";
import Place from "./../../Components/Place";
import Trip from "./../../Components/Trip";
import Day from "./../../Components/Day";
import { Route, Link, Switch } from "react-router-dom";
import { getSingleTrip, serviceUpdateTripName } from "./../../services/trip";
import { newDay, getDays } from "./../../services/day";
import { Button, Breadcrumb, Media, Form, Container } from "react-bootstrap";

class SingleTripView extends Component {
  constructor() {
    super();
    this.state = {
      trip: null,
      allDays: [],
      editName: false,
      tripName: ""
    };
  }

  componentDidMount = () => {
    this.getTripInfo();
  };

  AddDay = () => {
    const { id, tripId } = this.props.match.params;
    newDay({ id, tripId })
      .then((trip) => {
        this.setState({
          allDays: [...trip.allDays]
        });
      })
      .catch((error) => console.log(error));
  };

  getTripInfo = () => {
    const { id, tripId } = this.props.match.params;
    getDays({ id, tripId })
      .then((result) => {
        console.log(result);
        this.setState({
          trip: result,
          allDays: result.allDays,
          tripName: result.name
        });
      })
      .catch((error) => console.log(error));
  };

  statusTripName = () => {
    this.setState({
      editName: !this.state.editName
    });
  };

  cancelNameUpdate = () => {
    this.statusTripName();
    this.getTripInfo();
  };

  handleFormSubmission = (event) => {
    const { id, tripId } = this.props.match.params;
    event.preventDefault();
    const { tripName } = this.state;
    this.statusTripName();
    serviceUpdateTripName({ tripId, tripName })
      .then((result) => {})

      .catch((error) => console.log(error));
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  render() {
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
          <h2 className="mt-3 ml-3 mb-3">{this.state.tripName}</h2>{" "}
          {(this.state.editName && (
            <>
              <Container>
                <Form onSubmit={this.handleFormSubmission}>
                  <Form.Control
                    size="md"
                    name="tripName"
                    id="edit-input"
                    type="text"
                    placeholder="Eurotrip, etc."
                    value={this.state.tripName}
                    onChange={this.handleInputChange}
                    autoComplete="on"
                  />
                  <br />
                  <Button className="mb-3" variant="success" type="submit" size="md">
                    Update
                  </Button>
                </Form>
              </Container>
              <Button className="mb-3" variant="warning" onClick={this.cancelNameUpdate} size="md">
                Cancel
              </Button>
            </>
          )) || (
            <>
              <Button className="mb-4 ml-3 shadow-sm" variant="light" onClick={this.statusTripName}>
                Change Name
              </Button>
            </>
          )}
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
                    <h5>Day {index + 1}</h5>
                   
                    <Day {...day} day={this.AddDay} index={index} />

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
