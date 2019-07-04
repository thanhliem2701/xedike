import React, { Component } from "react";
// import ProfileForm from "./ProfileForm";
import { connect } from "react-redux";
// import Moment from "react-moment";
import { getMyProfile } from "../../action/auth";
// import getFinerPrint from "../../helpers/getFingerPrint";
// import setHeaders from "../../helpers/setHeaders";
import axios from "axios";

import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      fullName: "",
      phone: "",
      dateOfBirth: "",
      userType: "",
      avatar: "",
      file: null
    };
  }

  onChange = e => {
     
    this.setState(
      {
        [e.target.name]: e.target.value,
        file: e.target.files && e.target.files[0]
      },
      () => {
        const formData = new FormData();
        formData.append("avatar", this.state.file);

        axios
          .post("/api/users/upload-avatar", formData)
          .then(res => {
              console.log(res.data)
            this.setState({
              avatar: res.data.avatar
            });
          })
          .catch(err => console.log(err));
      }
    );
  };

  onSubmit = e => {
    e.preventDefault();

    // this.props.register(this.state, this.props.history);
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) return;
    let { profile } = this.props.auth;

    this.props.getMyProfile(profile.id, user => {
      this.setState(user);
    });
  }

  componentWillReceiveProps = nextProps => {
    const { profile } = nextProps.auth;
    this.setState(profile);
  };

  render() {
    // let DOB = <Moment format="dd/MM/yyyy">{this.state.dateOfBirth}</Moment>;
    // console.log("TCL: Profile -> render -> DOB", DOB)
    return (
      <div className="container text-left">
        <h1>MY PROFILE</h1>
        <Container>
          <Row>
            <Col md={5}>
              <img
                src={`http://localhost:5000/${this.state.avatar}`}
                alt="avatar"
              />
              <input
                type="file"
                name="file"
                onChange={this.onChange}
                file={this.state.file}
              />
            </Col>
            <Col md={7}>
              My Info
              <Form onSubmit={this.onSubmit} method="POST">
                <FormGroup>
                  <Label for="email" className="d-flex justify-content-between">
                    Email
                    {/* <span className="text-danger">
                      {this.props.errors.email ? this.props.errors.email : ""}
                    </span> */}
                  </Label>
                  <Input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter email ..."
                    value={this.state.email}
                    onChange={this.onChange}
                    // invalid={this.props.errors.email ? true : false}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="fullName">Full name</Label>
                  <Input
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Enter fullName ..."
                    value={this.state.fullName}
                    onChange={this.onChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="userType">User type:</Label>
                  <Input
                    type="select"
                    name="userType"
                    id="userType"
                    value={this.state.userType}
                    onChange={this.onChange}
                    disabled
                  >
                    <option value="-1">Select user type...</option>
                    <option value="passenger">passenger</option>
                    <option value="driver">driver</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="phone">Phone</Label>
                  <Input
                    type="number"
                    name="phone"
                    id="phone"
                    placeholder="Enter phone ..."
                    value={this.state.phone}
                    onChange={this.onChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="DOB">Date Of Birth</Label>
                  <Input
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    placeholder="Enter DOB ..."
                    value={this.state.dateOfBirth}
                    // value={DOB}
                    onChange={this.onChange}
                  />
                </FormGroup>

                <Button>Submit</Button>
              </Form>
            </Col>
          </Row>
        </Container>

        {/* <ProfileForm
          content={this.state.content}
          onSubmit={this.onSubmit}
          ApiErr={this.props.errors}
        /> */}
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
  { getMyProfile }
)(Profile);
