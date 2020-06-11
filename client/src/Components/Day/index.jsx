import React from "react";
import { getDays } from "../../services/day";
import { Card, Button, Badge, Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./index.css";

function Day(props) {
  //const { name, _id, userId, index } = props;
  //const { id, tripId } = props.match.params;
  return (
    <div></div>
    // <Media className="ml-3 mb-4">
    //   <img
    //     width={64}
    //     height={64}
    //     className="mr-3"
    //     src="https://meustc.com/wp-content/uploads/2020/01/placeholder-1.png"
    //     alt="Generic placeholder"
    //   />
    //   <Media.Body>
    //     <h5>Trip Day</h5>
    //     <p className="text-secondary less-width">
    //       Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
    //       been the industry's standard dummy text ever since the 1500s, when an unknown printer took
    //       a galley of type and scrambled it to make a type specimen book.
    //     </p>
    //     {/* <Button onClick={() => props.day()} variant="dark">
    //       <Link className="white" to={`/user/${id}/${tripId}/${index + 1}`}>
    //         Explore Places
    //       </Link>
    //     </Button> */}
    //   </Media.Body>
    // </Media>
  );
}

export default Day;
