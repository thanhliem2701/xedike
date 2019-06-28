import React from "react";
import * as Yup from "yup";
import "./registerForm.css";
import { withFormik } from "formik";
import classnames from "classnames";
import { Button } from "reactstrap";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address !")
      .required("Email is required !"),
    passWord: Yup.string()
      .min(6, "C'mon, your password is longer than that !")
      .required("password is required !")
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
const LoginForm = props => {
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
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextInput
          id="email"
          type="text"
          label="Email"
          placeholder="Enter email..."
          error={(touched.email && errors.email) || ApiErr.email}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextInput
          id="passWord"
          type="password"
          label="Password"
          placeholder="Enter password..."
          error={(touched.passWord && errors.passWord) || ApiErr.passWord}
          value={values.passWord}
          onChange={handleChange}
          onBlur={handleBlur}
        />
    
        <Button name="submit" type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default formikEnhancer(LoginForm);
