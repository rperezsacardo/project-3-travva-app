import React, { Component } from "react";
import SignUp from "./View/Authentication/SignUp";
import SignIn from "./View/Authentication/SignIn";
import EditTripView from "./View/EditTripView";
import HomeView from "./View/HomeView";
import SingleDayView from "./View/SingleDayView";
import SinglePlaceView from "./View/SinglePlaceView";
import SingleTripView from "./View/SingleTripView";
import UserView from "./View/UserView";
import Navbar from "./Components/NavBar";
import Place from "./Components/Place";
import Trip from "./Components/Trip";
import Day from "./Components/Day";

//import containers with underlying styles
import { Container, Row, Col } from 'react-bootstrap';
//import data from outside location

import { Route, Link, Switch } from "react-router-dom";

import "./App.css";

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route component={HomeView} exact path="/" />
          <Route component={UserView} exact path="/user/:id" />
          <Route component={SingleTripView} exact path="/user/:id/:tripId" />
          <Route component={SingleTripView} exact path="/trip/:tripId" />{" "}
          {/* {Show The trip from other user} */}
          <Route component={EditTripView} exact path="/user/:id/:tripId/edit" />
          <Route component={SinglePlaceView} exact path="/user/:id/:tripId/:day/:place" />
          <Route component={SingleDayView} exact path="/user/:id/:tripId/:day" />
          <Route component={SignUp} exact path="/authentication/sign-up" />
          <Route component={SignIn} exact path="/authentication/sign-in" />
        </Switch>
      </div>
    );
  }
}

export default App;
