import React from "react";
import { Media, Container, Badge } from "react-bootstrap";
import "./index.css";

function Comments(props) {
  return (
    <Media className="mb-3">
      <img
        width={64}
        height={64}
        className="mr-3"
        src={props.profile_photo_url}
        alt="author profile"
      />
      <Media.Body>
        <h5>
          <Badge variant="warning">Rating: {props.rating}/5</Badge>
        </h5>
        <small>
          {props.author_name}, <i>{props.relative_time_description}</i>
        </small>
        <p>{props.text}</p>
      </Media.Body>
    </Media>
  );
}

export default Comments;

// author_name: "Ben"
// author_url: "https://www.google.com/maps/contrib/107305501038033813009/reviews"
// language: "en"
// profile_photo_url: "https://lh4.ggpht.com/-o4pX_geVB-0/AAAAAAAAAAI/AAAAAAAAAAA/Qh0bFM34WZU/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg"
// rating: 5
// relative_time_description: "3 weeks ago"
