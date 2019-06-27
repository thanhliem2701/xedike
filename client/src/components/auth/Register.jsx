import React, { Component } from "react";
// import axios from "axios";
// import _ from "lodash";
import RegisterForm from "./ResgisterForm";
import { register } from "../../action/auth";
import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    // const {handleBlur} = props;
    this.state = {
      content: {
        email: "",
        passWord: "",
        passWord2: "",
        fullName: "",
        phone: "",
        dateOfBirth: "",
        userType: ""
      },
      errors: {}
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps.errors)

  //   this.setState({
  //     errors: nextProps.errors
  //   })
  // }

  onSubmit = values => {
    this.props.register(values,this.props.history);
    
    // e.preventDefault();
    // axios
    //   // .post("http://localhost:5000/api/users/register", this.state)
    //   .post("/api/users/register", values)
    //   .then(res => {
    //     // console.log("response: ", res);
    //     this.setState({
    //       errors:{}
    //     })
    //     alert("Register successful !")
    //     this.props.history.push("/registersuccess")
    //   })
    //   .catch(err => {
    //     this.setState({
    //       // dấu {} phía sau nghĩa là trường hợp ko có dữ liệu thì object rỗng, neu undefine
    //       errors: _.get(err, "response.data", {})
    //     });
    //   });
  };

  // componentWillReceiveProps

  render() {
    return (
      <div className="container text-left">
        <h1>REGISTER</h1>
        <RegisterForm
          content={this.state.content}
          onSubmit={this.onSubmit}
          ApiErr={this.props.errors}
        />
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
  { register }
)(Register);
