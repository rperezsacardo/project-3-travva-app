import React from "react";
import { getDays } from "../../services/day";
import { Card, Button, Badge, Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./index.css";

function Day(props) {
  //const { name, _id, userId, index } = props;
  const dayPlan = props.dayPlan;
  return (
    <div>
      <Media className="ml-3 mb-4">
        <Media.Body>
          <div className="text-secondary less-width">
            {(dayPlan.length && (
              <>
                {" "}
                {dayPlan.map((place) => {
                  return <p>{place.name}</p>;
                })}
              </>
            )) || <p>(empty day)</p>}
          </div>
        </Media.Body>
      </Media>
    </div>
  );
}

export default Day;
