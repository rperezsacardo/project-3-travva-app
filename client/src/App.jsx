import React, { Component } from "react";
import SignUp from "./View/Authentication/SignUp";
import SignIn from "./View/Authentication/SignIn";
import HomeView from "./View/HomeView";
import ErrorView from "./View/Error";
import SingleDayView from "./View/SingleDayView";
import SinglePlaceView from "./View/SinglePlaceView";
import SingleTripView from "./View/SingleTripView";
import UserView from "./View/UserView";
import Navbar from "./Components/NavBar";
import Place from "./Components/Place";
import Trip from "./Components/Trip";
import Day from "./Components/Day";
import { Container, Row, Col } from "react-bootstrap";
import { Route, Link, Switch, Redirect, withRouter } from "react-router-dom";
import { loadUserInfo } from "./services/authentication";
import FooterPage from "./Components/FooterPage";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  componentDidMount = () => {
    loadUserInfo()
      .then((user) => {
        this.updateUser(user);
      })
      .catch((error) => console.log(error));
  };

  updateUser = (user) => {
    this.setState({
      user
    });
  };

  sendUser = () => {};

  render() {
    return (
      <div className="App">
        <Navbar updateUser={this.updateUser} user={this.state.user} />
        <Switch>
          <Route component={HomeView} exact path="/" />
          <Route
            render={(props) => <UserView {...props} user={this.state.user} />}
            exact
            path={`/user/:id`}
          />
          <Route component={SingleTripView} exact path="/user/:id/:tripId" />
          <Route component={SingleTripView} exact path="/trip/:tripId" />{" "}
          <Route component={SingleDayView} exact path="/user/:id/:tripId/:day" />
          <Route component={SinglePlaceView} exact path="/user/:id/:tripId/:day/:placeId" />
          <Route
            exact
            path="/authentication/sign-up"
            render={(props) => <SignUp {...props} updateUser={this.updateUser} />}
          />
          <Route
            exact
            path="/authentication/sign-in"
            render={(props) => <SignIn {...props} updateUser={this.updateUser} />}
          />
          <Route path="/error/:code" component={ErrorView} />
          <Redirect to="/error/404" />
        </Switch>
        <FooterPage />
      </div>
    );
  }
}

export default App;
