import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Header from "./components/layouts/Header";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import RegisterSuccess from "./components/auth/RegisterSuccess";
import { setCurrentUser, logOut } from "./action/auth";
import jwrDecode from "jwt-decode";
import { connect } from "react-redux";
import Profile from "../src/components/auth/Profile";
import NotFound from "../src/components/notfound";
import getFinerPrint from "./helpers/getFingerPrint";
import setHeaders from "./helpers/setHeaders";

class App extends Component {
  componentDidMount() {
    //goi set current user
    const token = localStorage.getItem("token");
    if (!token) return;
    const decoded = jwrDecode(token);
    this.props.setCurrentUser(decoded);
    getFinerPrint(fingerPrint => {
      setHeaders(token, fingerPrint);
      this.forceUpdate(); //  yeu cau render lai
    });

    // Neu date.now > exp trong token thi logout
    if (Date.now() / 1000 > decoded.exp) {
      this.props.logOut();
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="App">
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route
              path="/profile"
              exact
              component={isAuthenticated ? Profile : NotFound}
            />
            <Route path="/registersuccess" exact component={RegisterSuccess} />
            <Redirect to="/login" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { setCurrentUser, logOut }
)(App);
