import React, { Component } from "react";

// import _ from "lodash";
// import axios from "axios";
// import jwtDecode from "jwt-decode";
// import Fingerprint2 from "fingerprintjs2";
import { connect } from "react-redux";
import { login } from "../../action/auth";
import LoginForm from "./LoginForm";
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
      content: { email: "", passWord: "" },
      errors: {}
    };
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = values => {
    // e.preventDefault();
    this.props.login(values);
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
        <LoginForm
          content={this.state.content}
          onSubmit={this.onSubmit}
          ApiErr={this.props.errors}
        />
        {/* <Button onClick={this.testPrivate}>TEST</Button> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { login }
)(Login);
