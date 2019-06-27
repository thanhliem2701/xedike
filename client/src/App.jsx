import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Header from "./components/layouts/Header";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import RegisterSuccess from "./components/auth/RegisterSuccess";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <BrowserRouter>
          <Switch>
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/registersuccess" exact component={RegisterSuccess} />
            <Redirect to="/login" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
