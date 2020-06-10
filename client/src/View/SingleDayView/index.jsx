import React, { Component, useState } from "react";
import NavBar from "./../../Components/NavBar";
import Place from "./../../Components/Place";
import Trip from "./../../Components/Trip";
import Day from "./../../Components/Day";
import { getAllPlacesFromApi } from "../../services/places";

//import containers with underlying styles
import { Container, Row, Col, Form } from "react-bootstrap";

class SingleDayView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      places: null
    };
  }

  /*const [added, notAdded] = useState(false)

  function displayAsAdded(){
    added(true)

    setTimeout(() => {
      notAdded(false)
    }, 500);
  }*/

  /*componentDidMount() {
    ifthis.setState places)
    places: places;
  }*/

  handleFormSubmission = (event) => {
    event.preventDefault();
    const { query } = this.state;
    // console.log(`Query: ${query}`);
    getAllPlacesFromApi(query)
      .then((result) => {
        console.log(result);
        const newPlaces = result.places;
        this.setState({
          places: [...newPlaces]
        });
      })
      .catch((error) => console.log(error));
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  showPlaces = () => {
    const allPlaces = this.state.places;
  };

  render() {
    const allPlaces = this.state.places;
    return (
      <div>
        <h1>Map over Google api</h1>
        <Form onSubmit={this.handleFormSubmission}>
          <label>Search Form</label>
          <input
            name="query"
            id="search-input"
            type="text"
            placeholder="Search for a city..."
            value={this.state.query} //query passed into search bar
            onChange={this.handleInputChange}
            autoComplete="on"
          />
          <button>🔎</button>
        </Form>

        <div>
          {allPlaces && (
            <Container>
              <Row>
                <>
                  {allPlaces.map((place) => {
                    return (
                      <Col sm={4} className="mb-5">
                        <Place {...place} />
                      </Col>
                    );
                  })}
                </>
              </Row>
            </Container>
          )}
        </div>
        <Day />
      </div>
    );
  }
}

export default SingleDayView;
