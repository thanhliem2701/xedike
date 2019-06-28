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
      .test("passwords-match", "please choose user type !", function(value) {
        return value !== "-1";
      }),
    dateOfBirth: Yup.string().required("Your date of birth is required.")
  }),

  mapPropsToValues: ({ content }) => ({
    ...content
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
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
        {options.map((op, key) => {
          return (
            <option key={key} value={op.key}>
              {op.value}
            </option>
          );
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
    ApiErr
  } = props;

  const inputArr = [
    { id: "email",type:"text",label:"Email",placeholder:"Enter email..."},
    { id: "passWord",type:"password",label:"Password",placeholder:"Enter password..."},
    { id: "passWord2",type:"Password",label:"Confirm Password",placeholder:"Enter confirm password..."},
    { id: "fullName",type:"text",label:"Full Name",placeholder:"Enter your Full Name..."},
    { id: "phone",type:"text",label:"Phone number",placeholder:"Enter phone number..."},
    { id: "dateOfBirth",type:"date",label:"Date Of Birth",placeholder:"Enter Date Of Birth..."}
  ];

  const inputItem = inputArr.map (ipa => {
    return (
      <TextInput
          id = {ipa.id}
          type= {ipa.type}
          label= {ipa.label}
          placeholder= {ipa.placeholder}
          error={(touched[ipa.id] && errors[ipa.id]) || ApiErr[ipa.id]}
          value={values[ipa.id]}
          onChange={handleChange}
          onBlur={handleBlur}
        />
    )
  })

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {inputItem}
        {/* <TextInput
          id="email"
          type="text"
          label="Email"
          placeholder="Enter email..."
          error={(touched.email && errors.email) || ApiErr.email}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />*/}
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
        />
        <Button name="submit" type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default formikEnhancer(ResgisterForm);
