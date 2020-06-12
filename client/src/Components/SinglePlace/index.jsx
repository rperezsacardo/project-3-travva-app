import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { getAllPlacesFromApi, getPlaceInformation } from "../../services/places";
import { Card, Button, Badge } from "react-bootstrap";
import Comments from "./../Comments";
let status = true;
const onOff = () => !status;

class SinglePlace extends Component {
  constructor(props) {
    super();
    this.state = {
      photoWithKey: null,
      bookmarked: null,
      place: null,
      render: false
    };
  }

  updateInfo = (body) => {
    const { place, placeDocument } = body;
    const { photo } = placeDocument;
    console.log(photo);

    const photoWithKey =
      photo === undefined
        ? "https://meustc.com/wp-content/uploads/2020/01/placeholder-1.png"
        : photo + process.env.REACT_APP_GOOGLE_PLACES_API_KEY;

    this.setState({
      photoWithKey,

      render: true,
      place
    });
  };

  loadInformation = () => {
    const { placeId } = this.props.match.params;
    getPlaceInformation({ placeId })
      .then((result) => {
        this.updateInfo(result);
      })
      .catch((error) => console.log(error));
  };

  placeBookmarked = () => {
    this.setState({
      bookmarked: !this.state.bookmarked
    });
  };

  componentDidMount = () => {
    this.loadInformation();
  };

  render() {
    const { placeId, day, id, tripId } = this.props;

    if (this.state.place) {
      const {
        formatted_address,
        rating,
        photo,
        bookmarked,
        website,
        reviews, // array with 5 reviews
        photos, // array with phots from google
        url
      } = this.state.place;
      const placeName = this.state.place;
    }

    return (
      <Card className="shadow-sm rounded h-100">
        <Card.Img variant="top" src={this.state.photoWithKey} />
        <Card.Body>
          {this.state.place && (
            <div className="mb-2">
              <h1>{this.state.place.name}</h1>
              <Card.Title className="mb-0">{this.state.place.name}</Card.Title>
              <Card.Text className="text-secondary">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since....
                <a target="_blank" rel="noopener noreferrer" href={this.state.place.url}>
                  {" "}
                  Maps
                </a>
              </Card.Text>
              <Badge variant="warning">Rating {this.state.place.rating}</Badge>
            </div>
          )}
          {this.state.place && (
            <ul>
              {this.state.place.reviews.map((comment) => {
                return (
                  <li>
                    <Comments {...comment} />
                  </li>
                );
              })}
            </ul>
          )}
          {(this.props.bookmarked && (
            <>
              <Button
                variant="success"
                onClick={() => {
                  this.props.addPlace(this.state.place.place_id);
                }}
              >
                ➕ Add to Day
              </Button>
            </>
          )) || (
            <>
              <Button
                variant="outline-success"
                onClick={() => {
                  this.props.removePlace(this.state.place.place_id);
                  this.placeBookmarked();
                }}
              >
                ➖ Remove
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    );
  }
}

export default SinglePlace;
