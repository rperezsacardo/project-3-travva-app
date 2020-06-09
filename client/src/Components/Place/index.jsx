import React from "react";
import { getAllPlacesFromApi } from "../../services/places";

export default function Place(props) {
  return (
    <div className="place">
      <div className="place__media">
        <img src={props.photo} alt={props.name} />
      </div>
      <div className="place__body">
        <span>{props.name}</span>
        {/*<em>{formatPrice(props.price)}</em>*/}
      </div>
      <div className="place__actions">
        <button onClick={() => props.changeQuantity(props.quantity + 1)}>+</button>
      </div>
    </div>
  );
}
