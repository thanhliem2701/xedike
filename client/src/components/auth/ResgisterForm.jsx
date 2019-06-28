import React from "react";
import * as Yup from "yup";
import "./registerForm.css";
import { withFormik } from "formik";
import classnames from "classnames";
import { Button } from "reactstrap";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required!"),
    fullName: Yup.string()
      .min(2, "C'mon, your full name is longer than that")
      .required("Full Name is required."),
    passWord: Yup.string()
      .min(6, "C'mon, your password is longer than that")
      .required("password is required."),
    passWord2: Yup.string()
      .min(6, "C'mon, your confirm password is longer than that")
      .required("password is required.")
      .test(
        "passwords-match",
        "Your confirm password does not match !",
        function(value) {
          return this.parent.passWord === value;
        }
      ),
    phone: Yup.string()
      .min(10, "C'mon, your phone is longer than that")
      .required("phone is required."),
    userType: Yup.string()
    .required("User type is required.")
    .test("passwords-match","please choose user type !",function(value) {
      return value !== "-1";
    }),
    dateOfBirth: Yup.string().required("Your date of birth is required.")
  }),

  mapPropsToValues: ({ content }) => ({
    ...content
  }),
  
  handleSubmit: (values, { setSubmitting,props }) => {
    setSubmitting(false);
    props.onSubmit(values);
  }
});

const InputFeedback = ({ error }) =>
  error ? <div className="input-feedback">{error}</div> : null;

const Label = ({ error, className, children, ...props }) => {
  return (
    <label className="label" {...props}>
      {children}
    </label>
  );
};

const optionUserType = [
  { key: -1, value: "Please choose your type!" },
  { key: "driver", value: "Driver" },
  { key: "passenger", value: "Passenger" }
];

const TextInput = ({
  type,
  id,
  label,
  error,
  value,
  onChange,
  className,
  ...props
}) => {
  const classes = classnames(
    "input-group",
    {
      "animated shake error": !!error
    },
    className
  );
  return (
    <div className={classes}>
      <Label htmlFor={id} error={error}>
        {label}
      </Label>
      <input
        id={id}
        className="text-input"
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
      <InputFeedback error={error} />
    </div>
  );
};

const SelectInput = ({
  type,
  id,
  label,
  error,
  value,
  onChange,
  className,
  options,
  ...props
}) => {
  const classes = classnames(
    "input-group",
    {
      "animated shake error": !!error
    },
    className
  );
  return (
    <div className={classes}>
      <Label htmlFor={id} error={error}>
        {label}
      </Label>
      <select
        id={id}
        className="text-input"
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      >
        {options.map((op,key) => {
          return <option key={key} value={op.key}>{op.value}</option>;
        })}
      </select>
      <InputFeedback error={error} />
    </div>
  );
};

const ResgisterForm = props => {
  const {
    values,
    touched,
    errors,
    // dirty,
    handleChange,
    handleBlur,
    handleSubmit,
    // handleReset,
    isSubmitting,
    ApiErr,
  } = props;
  // console.log(ApiErr)
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <FormGroup> */}

        <TextInput
          id="email"
          type="text"
          label="Email"
          placeholder="Enter email..."
          error={(touched.email && errors.email) || ApiErr.email }
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {/* <Label for="email" className="d-flex justify-content-between">
            Email
            <span className="text-danger">{errors.content.email}</span>
          </Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email..."
            value={values.content.email}
            onChange={handleChange}
            // onBlur = {this.handleBlur}
            invalid={touched.content.email && errors.content.email}
          /> */}
        {/* </FormGroup>

        <FormGroup> */}
        <TextInput
          id="passWord"
          type="passWord"
          label="Password"
          placeholder="Enter password..."
          error={(touched.passWord && errors.passWord) || ApiErr.passWord }
          value={values.passWord}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {/* <Label for="passWord" className="d-flex justify-content-between">
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
          /> */}
        {/* </FormGroup>

        <FormGroup> */}
        <TextInput
          id="passWord2"
          type="passWord"
          label="Confirm Password"
          placeholder="Enter confirm password..."
          error={(touched.passWord2 && errors.passWord2) || ApiErr.passWord2}
          value={values.passWord2}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {/* <Label for="passWord2" className="d-flex justify-content-between">
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
          /> */}
        {/* </FormGroup>
        <FormGroup> */}
        <TextInput
          id="fullName"
          type="text"
          label="Full Name"
          placeholder="Enter your Full Name..."
          error={(touched.fullName && errors.fullName) || ApiErr.fullName}
          value={values.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {/* <Label for="fullName" className="d-flex justify-content-between">
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
          /> */}
        {/* </FormGroup>
        <FormGroup> */}
        <SelectInput
          id="userType"
          type="select"
          label="User Type"
          // placeholder="Please choose your user type..."
          error={(touched.userType && errors.userType) || ApiErr.userType}
          value={values.keys}
          onChange={handleChange}
          onBlur={handleBlur}
          options={optionUserType}
        >
          {/* <option value="-1">Select user type...</option>
            <option value="passenger">Passenger</option>
            <option value="driver">Driver</option> */}
        </SelectInput>

        {/* </FormGroup>
        <FormGroup> */}
        <TextInput
          id="phone"
          type="text"
          label="Phone number"
          placeholder="Enter your phone number..."
          error={(touched.phone && errors.phone ) || ApiErr.phone}
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {/* <Label for="phone" className="d-flex justify-content-between">
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
          /> */}
        {/* </FormGroup>
        <FormGroup> */}
        <TextInput
          id="dateOfBirth"
          type="date"
          label="Date Of Birth"
          placeholder="Enter your Date Of Birth..."
          error={(touched.dateOfBirth && errors.dateOfBirth) || ApiErr.dateOfBirth}
          value={values.dateOfBirth}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {/* <Label for="dateOfBirth" className="d-flex justify-content-between">
            Date Of Birth
            <span className="text-danger">{this.state.errors.dateOfBirth}</span>
          </Label>
          <Input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            placeholder="Enter DOB"
            value={this.state.dateOfBirth}
            onChange={this.onChange}
            invalid={this.state.errors.dateOfBirth ? true : false}
          /> */}
        {/* </FormGroup> */}
        <Button name="submit" type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default formikEnhancer(ResgisterForm);