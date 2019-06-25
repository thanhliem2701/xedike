import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import axios from "axios";
import _ from "lodash";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      passWord: "",
      passWord2: "",
      fullName: "",
      phone: "",
      dateOfBirth: "",
      userType: "",
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
      .post("/api/users/register", this.state)
      .then(res => {
        console.log("response: ", res);
      })
      .catch(err => {
        // console.log(err.response.data);
        this.setState({
          errors: _.get(err, "response.data", {}) // dấu {} phía sau nghĩa là trường hợp ko có dữ liệu thì object rỗng, né undefine
        });
      });
  };
  render() {
    return (
      <div className="container text-left">
        <h1>REGISTER</h1>
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

          <FormGroup>
            <Label for="passWord2" className="d-flex justify-content-between">
              Confirm Password
              <span className="text-danger">{this.state.errors.passWord2}</span>
            </Label>
            <Input
              type="passWord"
              name="passWord2"
              id="passWord2"
              placeholder="Enter Confirm Password..."
              value={this.state.password2}
              onChange={this.onChange}
              invalid={this.state.errors.passWord2 ? true : false}
            />
          </FormGroup>
          <FormGroup>
            <Label for="fullName" className="d-flex justify-content-between">
              Full Name
              <span className="text-danger">{this.state.errors.fullName}</span>
            </Label>
            <Input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Enter Full Name..."
              value={this.state.fullName}
              onChange={this.onChange}
              invalid={this.state.errors.fullName ? true : false}
            />
          </FormGroup>
          <FormGroup>
            <Label for="userType" className="d-flex justify-content-between">
              User Type
              <span className="text-danger">{this.state.errors.userType}</span>
            </Label>
            <Input
              type="select"
              name="userType"
              id="userType"
              value={this.state.userType}
              onChange={this.onChange}
              invalid={this.state.errors.userType ? true : false}
            >
              <option value="-1">Select user type...</option>
              <option value="passenger">Passenger</option>
              <option value="driver">Driver</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="phone" className="d-flex justify-content-between">
              Phone
              <span className="text-danger">{this.state.errors.phone}</span>
            </Label>
            <Input
              type="text"
              name="phone"
              id="phone"
              placeholder="Enter phone..."
              value={this.state.phone}
              onChange={this.onChange}
              invalid={this.state.errors.phone ? true : false}
            />
          </FormGroup>
          <FormGroup>
            <Label for="dateOfBirth" className="d-flex justify-content-between">
              Date Of Birth
              <span className="text-danger">
                {this.state.errors.dateOfBirth}
              </span>
            </Label>
            <Input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              placeholder="Enter DOB"
              value={this.state.DOB}
              onChange={this.onChange}
              invalid={this.state.errors.dateOfBirth ? true : false}
            />
          </FormGroup>
          <Button name="submit" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
