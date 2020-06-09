import React, { Component } from "react";
import NavBar from "./../../Components/NavBar";
import Place from "./../../Components/Place";
import Trip from "./../../Components/Trip";
import Day from "./../../Components/Day";
import { getAllPlacesFromApi } from "../../services/places";

class SingleDayView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      places: null
    };
  }

  /*componentDidMount() {
    ifthis.setState places)
    places: places;
  }*/

  handleFormSubmission = (event) => {
    event.preventDefault();
    const { query } = this.state;
    console.log(`Query: ${query}`);
    getAllPlacesFromApi(query)
      .then((result) => {
        //console.log(result);
        this.setState({
          places: [...result]
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

  render() {
    return (
      <div>
        <h1>Map over Google api</h1>
        <form onSubmit={this.handleFormSubmission}>
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
        </form>
        <Day />
      </div>
    );
  }
}

export default SingleDayView;
