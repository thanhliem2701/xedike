import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
// import _ from "lodash";
// import axios from "axios";
// import jwtDecode from "jwt-decode";
// import Fingerprint2 from "fingerprintjs2";
import { connect } from "react-redux";
import { login } from "../../action/auth";
// import { withRouter } from "react-router-dom";
// withRouter là higher order component
// Khi nó bọc 1 component lại thì component trả về sẽ có tất cả props

// CSS ko dung boot trap ma dung ben duoi
// material design -react-md
// material design component react
// ant-design: apollo graphql
// materialUI

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      passWord: "",
      errors: {}
    };
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state);
    // const { email, passWord } = this.state;
    //fingerprint2
    // Fingerprint2.getV18({}, function(fingerPrint) {   // loi lam mat this.
    // Fingerprint2.getV18({}, fingerPrint => {
    //   // console.log(result);

    // });
  };

  // testPrivate = () => {
  //   const token = localStorage.getItem("token");

  //   Fingerprint2.getV18({}, fingerPrint => {
  //     axios.defaults.headers.common["Authorization"] = token;
  //     axios.defaults.headers.common["fingerprint"] = fingerPrint;

  //     axios
  //     .get("/api/users/test-private")
  //     .then(res => console.log(res))
  //     .catch(err => console.log(err));
  //   })

  // };

  render() {
    return (
      <div className="container text-left">
        <h1>Login</h1>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="email" className="d-flex justify-content-between">
              Email
              <span className="text-danger">{this.state.errors.email}</span>
            </Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email..."
              value={this.state.email}
              onChange={this.onChange}
              invalid={this.state.errors.email ? true : false}
            />
          </FormGroup>

          <FormGroup>
            <Label for="passWord" className="d-flex justify-content-between">
              Password
              <span className="text-danger">{this.state.errors.passWord}</span>
            </Label>
            <Input
              type="passWord"
              name="passWord"
              id="passWord"
              placeholder="Enter password..."
              value={this.state.password}
              onChange={this.onChange}
              invalid={this.state.errors.passWord ? true : false}
            />
          </FormGroup>
          <Button name="submit" type="submit">
            Submit
          </Button>
        </Form>
        <Button onClick={this.testPrivate}>TEST</Button>
      </div>
    );
  }
}
export default connect(
  null,
  { login }
)(Login);
