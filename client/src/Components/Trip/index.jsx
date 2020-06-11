import React from "react";
import { getAllTripsFromUser } from "../../services/trip";
import { Card, Button, Badge, Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./index.css";

function Trip(props) {
  const { name, _id, numOfDays, userId, index } = props;
  const tripId = _id;
  // console.log(`name: ${name}`);
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
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book.
        </p>
        <Button variant="success">
          <Link className="white" to={`/user/${userId}/${_id}`}>
            Edit Trip
          </Link>
        </Button>
        <Button variant="warning" onClick={() => props.deleteTrip(props._id)}>
          Delete
        </Button>
      </Media.Body>
    </Media>
  );
}

export default Trip;
