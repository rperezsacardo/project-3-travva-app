import React, { Component } from "react";
import { getAllTripsFromUser } from "../../services/trip";
import { Card, Button, Badge, Media } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { Link } from "react-router-dom";
import "./index.css";

class Trip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null
    };
  }
  hideAlert = () => {
    this.setState({
      alert: !this.state.alert
    });
  };

  render() {
    const { name, _id, numOfDays, userId, index, allDays } = this.props;
    const tripId = _id;
    let allDaysSize;

    return (
      <Media className="ml-3 mb-4">
        <img
          width={64}
          height={64}
          className="mr-3"
          src="https://i.imgur.com/VwtnMdl.png"
          alt="trip icon"
        />
        <Media.Body>
          <h5>{name}</h5>
          <p className="text-secondary less-width">
            {(allDays.length && <> Number of days: {allDays.length} </>) || <p> (empty trip) </p>}
          </p>
          <Button variant="success">
            <Link className="white" to={`/user/${userId}/${_id}`}>
              Manage Trip
            </Link>
          </Button>
          {this.state.alert && (
            <SweetAlert
              showCancel
              confirmBtnText="Delete"
              confirmBtnBsStyle="link"
              title={`Delete Trip "${name}"  ?`}
              onConfirm={() => {
                this.props.deleteTrip(_id);
                this.hideAlert();
              }}
              onCancel={this.hideAlert}
              focusCancelBtn
            >
              You will not be able to recover this trip file!
            </SweetAlert>
          )}
          <Button variant="link" onClick={() => this.hideAlert()}>
            Delete
          </Button>
        </Media.Body>
      </Media>
    );
  }
}

export default Trip;
