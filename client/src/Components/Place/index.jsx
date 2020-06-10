import React from "react";
import { getAllPlacesFromApi } from "../../services/places";

export default function Place(props) {
  const { name, photo, placeId } = props;
  const photoWithKey = photo + process.env.REACT_APP_GOOGLE_PLACES_API_KEY;
  console.log(photoWithKey);
  // addOrRemovePlace=()=>{
  //   this.setState({
  //     place: !this.state.place

  //   })

  // }

  return (
    <div className="place">
      <div className="place__media">
        <img src={photoWithKey} alt={props.name} />
      </div>
      <div className="place__body">
        <span>{name}</span>
        <span>{placeId}</span>
      </div>
      <div className="place__actions"></div>
      {/* <button onClick={this.addOrRemovePlace}> Add me</button> */}
    </div>
  );
}
