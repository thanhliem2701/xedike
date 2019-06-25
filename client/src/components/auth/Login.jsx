import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import _ from "lodash";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Fingerprint2 from "fingerprintjs2";

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
    axios
      //   .post("http://localhost:5000/api/users/register", this.state)
      .post("/api/users/login", this.state)
      .then(res => {
        // console.log("response: ", res);
        const token = res.data.token;
        localStorage.setItem("token", token);
        const decoded = jwtDecode(token);
        console.log(decoded);
        axios.defaults.headers.common["Authorization"] = token;

        //fingerprint2
        Fingerprint2.getV18({}, function(result, components) {
          console.log(result);
          axios.defaults.headers.common["fingerprint"] = result;
        });

        //Authorization
      })
      .catch(err => {
        // console.log(err.response.data);
        this.setState({
          errors: _.get(err, "response.data", {}) // dấu {} phía sau nghĩa là trường hợp ko có dữ liệu thì object rỗng, né undefine
        });
      });
  };
  testPrivate = () => {
    axios
      .get("/api/users/test-private")
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
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
export default Login;
