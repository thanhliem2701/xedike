const jwt = require("jsonwebtoken");

// route   POST  /api/users/test-private
// desc    test-private
// access  PRIVATE (Chỉ cho những user đã loginn vào hệ thống mới xài được)
const authenticating = (req, res, next) => {
  // verify token
  // thanhcong : return next()
  // .thatbai: res.json(err)
  const token = req.header("Authorization");
  try {
    const decoded = jwt.verify(token, "LouisPanda");
    console.log("TCL: authenticating -> decoded", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ errors: "Ban ko the xem" });
  }
};

// user : passenger, driver, admin
const authorizing = userTypeArray => {
  return (req, res, next) => {
    const { userType } = req.user;
    //userTypeArray : danh sach user co the dang nhap
    // userType lay tu token
    // Neu userTypeArray co chua userType minh muon thi tra ve next cho di tiep ko thi res
    if (userTypeArray.indexOf(userType) > -1) {
      return next();
    } else {
      res.status(403).json({ errors: "Ban ko co quyen vao day" });
    }
  };
};

module.exports = {
  authenticating,
  authorizing
};