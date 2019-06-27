const validator = require("validator");
const _ = require("lodash");
const { User } = require("../models/users");

// Đây là hàm bất đồng bộ nên chỗ nào xài nó phải sử dụng async await
validateRegisterInput = async data => {
  let errors = {};

  //kiểm tra input có trống hay ko
  //nếu rỗng thì cho là string ""
  // data.email = data.email ? data.email: ""
  data.email = _.get(data, "email", "");
  data.passWord = _.get(data, "passWord", "");
  data.passWord2 = _.get(data, "passWord2", "");
  data.userType = _.get(data, "userType", "");
  data.dateOfBirth = _.get(data, "dateOfBirth", "");
  data.fullName = _.get(data, "fullName", "");
  data.phone = _.get(data, "phone", "");

  //lodash.toPair() chuyen Object thanh array
  //lodash.fromPair Array => object
  // function programming : pipe line _.chain
  //_.chain(data).toPair().map().fromPair

  //validate email
  if (validator.isEmpty(data.email)) {
    // true la ""
    errors.email = "Email is required !";
  } else if (!validator.isEmail(data.email)) {
    // true la email valid
    errors.email = "Email is invalid";
  } else {
    const user = await User.findOne({ email: data.email });
    if (user) errors.email = "Email already exist !";
  }

  //validate password
  if (validator.isEmpty(data.passWord)) {
    errors.passWord = "Password is required !";
  } else if (!validator.isLength(data.passWord, { min: 6 })) {
    errors.passWord = "Password must be at least 6 characters !";
  }

  //validate password2
  if (validator.isEmpty(data.passWord2)) {
    errors.passWord2 = "Confirm Password is required !";
  } else if (!validator.equals(data.passWord, data.passWord2)) {
    errors.passWord2 = "Password does not match !";
  }

  // DOB
  if (validator.isEmpty(data.dateOfBirth)) {
    errors.dateOfBirth = "Please input your date of birth !"
  }

  //user type
  // console.log(data.userType)
  if (validator.isEmpty(data.userType) || data.userType == -1) {
    errors.userType = "Please choose user type !"
  }

  //FullName
  if (validator.isEmpty(data.fullName)) {
    errors.fullName = "Please input full name !";
  }

  //validate phone
  if (validator.isEmpty(data.phone)) {
    // true la ""
    errors.phone = "Phone is required !";
  } else if (!validator.isLength(data.phone, { min: 10 })) {
    // true la phone valid
    errors.phone = "Phone is invalid";

  } else {
    const user = await User.findOne({ phone: data.phone });
    // console.log("phone :", data.phone)
    if (user) errors.phone = "Phone already existed";
  }

  return {
    // isValid: true neu errors la {}; isValid : false khi errors cos data
    isValid: _.isEmpty(errors), // errors dang la object nen ko dung validator
    errors
  };
};

module.exports = validateRegisterInput;
