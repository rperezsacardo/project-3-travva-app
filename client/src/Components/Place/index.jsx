import React from "react";
import { getAllPlacesFromApi } from "../../services/places";
import { Card, Button, Badge } from "react-bootstrap";

function Place(props) {
  const { name, photo, placeId } = props;
  console.log(props);
  const photoWithKey =
    photo === undefined
      ? "https://meustc.com/wp-content/uploads/2020/01/placeholder-1.png"
      : photo + process.env.REACT_APP_GOOGLE_PLACES_API_KEY;

  return (
    <Card className="shadow-sm rounded h-100">
      <Card.Img
        variant="top"
        src={photoWithKey}
        al={"https://meustc.com/wp-content/uploads/2020/01/placeholder-1.png"}
      />
      <Card.Body>
        <div className="mb-2">
          <Card.Title className="mb-0">{name}</Card.Title>
          <Card.Text className="text-secondary">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s.
          </Card.Text>
          <Badge variant="warning">Rating 4.5</Badge>
        </div>
        <Button variant="success" onClick={() => props.addPlace(placeId)}>
          ➕ Add to Day
        </Button>
        <button>teste </button>
      </Card.Body>
    </Card>
  );
}

export default Place;
