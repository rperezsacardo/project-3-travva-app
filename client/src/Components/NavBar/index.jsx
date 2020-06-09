import React, { Component } from "react";
import { getAllPlacesFromApi } from "../../services/places";
import { Link } from "react-router-dom";
import { signOut } from "./../../services/authentication";

export class NavBar extends Component {
  constructor(props) {
    super(props);
    console.log("Constructor method ran");
    this.state = {
      query: ""
    };
  }

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
      <div className="App">
        <form onSubmit={this.handleFormSubmission}>
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
      </div>
    );
  }
}

export default NavBar;
