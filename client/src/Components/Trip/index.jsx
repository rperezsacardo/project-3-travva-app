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
    console.log("Hiding alert...");
    this.setState({
      alert: !this.state.alert
    });
  };

  render() {
    console.log(this);
    const { name, _id, numOfDays, userId, index } = this.props;
    const tripId = _id;
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
          <h5>{name}</h5>
          <p className="text-secondary less-width">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book.
          </p>
          <Button variant="success">
            <Link className="white" to={`/user/${userId}/${_id}`}>
              Manage Trip
            </Link>
          </Button>
          {this.state.alert && (
            <SweetAlert
              warning
              showCancel
              confirmBtnText="Yes, delete it!"
              confirmBtnBsStyle="sucess"
              title="Are you sure?"
              onConfirm={() => {
                this.props.deleteTrip(this.props._id);
                this.hideAlert();
              }}
              onCancel={this.hideAlert}
              focusCancelBtn
            >
              You will not be able to recover this imaginary file!
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
