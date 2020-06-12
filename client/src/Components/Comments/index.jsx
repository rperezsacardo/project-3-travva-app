import React from "react";

function Comments(props) {
  return (
    <div>
      <small>{props.author_name}</small>
      <p>{props.text}</p>
    </div>
  );
}

export default Comments;

// author_name: "Ben"
// author_url: "https://www.google.com/maps/contrib/107305501038033813009/reviews"
// language: "en"
// profile_photo_url: "https://lh4.ggpht.com/-o4pX_geVB-0/AAAAAAAAAAI/AAAAAAAAAAA/Qh0bFM34WZU/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg"
// rating: 5
// relative_time_description: "3 weeks ago"
