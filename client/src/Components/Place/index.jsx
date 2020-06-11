import React, { Component } from "react";
import { getAllPlacesFromApi } from "../../services/places";
import { Card, Button, Badge } from "react-bootstrap";
let status = true;
const onOff = () => !status;

class Place extends Component {
  constructor(props) {
    super();
    this.state = {
      photoWithKey: null,
      bookmarked: null
    };
  }

  loadInfo = () => {
    const { name, photo, placeId, bookmarked } = this.props;
    const photoWithKey =
      photo === undefined
        ? "https://meustc.com/wp-content/uploads/2020/01/placeholder-1.png"
        : photo + process.env.REACT_APP_GOOGLE_PLACES_API_KEY;

    this.setState({
      photoWithKey,
      bookmarked
    });
  };

  componentDidMount = () => {
    this.loadInfo();
  };

  placeBookmarked = () => {
    this.setState({
      bookmarked: !this.state.bookmarked
    });
  };

  render() {
    // console.log("status", this.state.bookmarked);
    const { name, photo, placeId } = this.props;

    return (
      <Card className="shadow-sm rounded h-100">
        <Card.Img
          variant="top"
          src={this.state.photoWithKey}
          // alt={"https://meustc.com/wp-content/uploads/2020/01/placeholder-1.png"}
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
          {(this.props.addPlace && (
            <>
              (
              <Button
                variant="success"
                onClick={() => {
                  this.props.addPlace(placeId);
                  this.placeBookmarked();
                }}
              >
                ➕ Add to Day
              </Button>{" "}
              )
            </>
          )) || (
            <>
              {" "}
              (
              {
                <Button
                  variant="success"
                  onClick={() => {
                    this.props.removePlace(placeId);
                    this.placeBookmarked();
                  }}
                >
                  REMOVE
                </Button>
              }
              ){" "}
            </>
          )}
        </Card.Body>
      </Card>
    );
  }
}

export default Place;

// {(this.state.placeBookmarked && (
//   <>
//     {
//       <Button
//         variant="success"
//         onClick={() => {
//           this.props.addPlace(placeId);
//           this.placeBookmarked();
//         }}
//       >
//         ➕ Add to Day
//       </Button>
//     }{" "}
//   </>
// )) || (
//   <>
//     {" "}
//     {
//       <Button
//         variant="success"
//         onClick={() => {
//           console.log("click 1");
//           this.placeBookmarked();
//         }}
//       >
//         REMOVE
//       </Button>
//     }{" "}
//   </>
// )}

// function Place(props) {
//   const { name, photo, placeId } = props;

//   const photoWithKey =
//     photo === undefined
//       ? "https://meustc.com/wp-content/uploads/2020/01/placeholder-1.png"
//       : photo + process.env.REACT_APP_GOOGLE_PLACES_API_KEY;

//   return (

//     <Card className="shadow-sm rounded h-100">
//       <Card.Img
//         variant="top"
//         src={photoWithKey}
//         al={"https://meustc.com/wp-content/uploads/2020/01/placeholder-1.png"}
//       />
//       <Card.Body>
//      { console.log(status)}
//         <div className="mb-2">
//           <Card.Title className="mb-0">{name}</Card.Title>
//           <Card.Text className="text-secondary">
//             Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
//             has been the industry's standard dummy text ever since the 1500s.
//           </Card.Text>
//           <Badge variant="warning">Rating 4.5</Badge>
//         </div>
//         <Button variant="success" onClick={() => props.addPlace(placeId)}>
//           ➕ Add to Day
//         </Button>
//         <Button variant="success" onClick={() => onOff()}>
//           REMOVE
//         </Button>
//       </Card.Body>
//     </Card>
//   );
// }

// export default Place;
