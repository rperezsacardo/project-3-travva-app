import React from "react";
import { getAllTripsFromUser } from "../../services/trip";
import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

function Trip(props) {
  const { name, tripId, numOfDays } = props;
  console.log(`trip id: ${tripId}`);
  console.log(`name: ${name}`);
  return (
    <Card className="shadow-sm rounded h-100">
      <Card.Img
        variant="top"
        src={"https://meustc.com/wp-content/uploads/2020/01/placeholder-1.png"}
      />
      <Card.Body>
        <div className="mb-2">
          <Card.Title className="mb-0">{name}</Card.Title>
          <Card.Text className="text-secondary">Trip Description</Card.Text>
          <Badge variant="warning">{numOfDays}</Badge>
        </div>
        <Button variant="success">
          <Link to="{}">Edit Trip</Link>
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Trip;
