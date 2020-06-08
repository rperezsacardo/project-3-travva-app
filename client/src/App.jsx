import React from "react";
import Authentication from "./View/Authentication";
import EditTripView from "./View/EditTripView";
import HomeView from "./View/HomeView";
import SingleDayView from "./View/SingleDayView";
import SinglePlaceView from "./View/SinglePlaceView";
import SingleTripView from "./View/SingleTripView";
import UserView from "./View/UserView";
import Navbar from './Components/NavBar';
import Place from './Components/Place';
import Trip from './Components/Trip';
import Day from './Components/Day';

import { Route, Link, Switch } from "react-router-dom";

import "./App.css";

function App() {
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
        <Route component={Authentication} exact path="/authentication" />
      </Switch>
    </div>
  );
}

export default App;
