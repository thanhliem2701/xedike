// const express = require("express");
// const router = express.Router();
const { User } = require("../../../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { authenticating, authorizing } = require("../../../middlewares/auth");
// const { register } = require("../../middlewares/register");
const validateRegisterInput = require("../../../validation/validateRegisterInput");

const uploadAvatar = (req, res, next) => {
  const { id } = req.user;
  User.findById(id)
    .then(user => {
      if (!user) return Promise.reject({ errors });

      user.avatar = req.file.path;
      return user.save();
    })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(400).json(err));
};

// route   POST  /api/users/register
// desc    register new user
// access  PUBLIC
const register = async (req, res, next) => {

  const { isValid, errors } = await validateRegisterInput(req.body);
  
  if (!isValid) return res.status(400).json(errors);

  const { email, passWord, fullName, userType, phone, dateOfBirth } = req.body;
  const newUser = new User({
    email,
    passWord,
    fullName,
    userType,
    phone,
    dateOfBirth
  });
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return Promise.reject(err);

    bcrypt.hash(passWord, salt, (err, hash) => {
      if (err) return Promise.reject(err);

      newUser.passWord = hash;
      newUser
        .save()
        .then(user => res.status(200).json(user)) // success
        .catch(err => res.status(400).json(err)); // err
    });
  });
  // // Dang ky user
  // // gia dinh input valid
  // //   User.findOne({ email,phone  }).then(user => {    // kiem tra tho dang and
  // User.findOne({ $or: [{ email }, { phone }] }) // kiem tra theo dang or
  //   .then(user => {
  //     if (user) return Promise.reject({ errors: "Email exists" });
  //   })
  //   .catch(err => res.status(400).json(err)); // err
};
// router.post("/register", (req, res,next) => {
//   // console.log("TCL: res", res.body);
//   // res.send(req.body);

// });

//API, cấu trúc vậy gọi là middleware
// app.get("/", (req, res) => {
//   res.json({ message: "Hello world" });
// });

//có nhiều cái middleware, giữa các middleware phải có lệnh
// 1 middleware phải có 3 thứ req, res và next
// khi dùng res thì kết thúc middleware nên res. gì đó thì phải để cuối cùng
// router.get(
//   "/xyz",
//   (req, res, next) => {
//     console.log("Middleware 1");
//     next();
//   },
//   (req, res, next) => {
//     res.json({ message: "Middleware 2" });
//   }
// );

// route   POST  /api/users/login
// desc    Login
// access  PUBLIC
const login = (req, res, next) => {
  // router.post("/login", (req, res) => {
  const { email, passWord } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) return Promise.reject({ email: "Email does not exists !" });
      if (passWord ==="") return Promise.reject({ passWord: "Password is required !" });

      bcrypt.compare(passWord, user.passWord, (err, isMatch) => {
        if (!isMatch)
          return res.status(400).json({ passWord: "Password invalid !" });

        const payload = {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          userType: user.userType // Để phân quyền user, sau này lấy từ jwt về xài
        };
        jwt.sign(payload, "LouisPanda", { expiresIn: "1h" }, (err, token) => {
          if (err) return res.status(400).json(err);

          return res.status(200).json({
            message: "login success",
            token
          });
        });
        // res.status(200).json({
        //   message: "success 1"
        // });
      });
    })
    .catch(err => res.status(400).json(err)); // err
  // });
};
// route   POST  /api/users/test-private
// desc    test-private
// access  PRIVATE (Chỉ cho những user đã loginn vào hệ thống mới xài được)
const testPrivate = (req, res, next) => {
  res.status(200).json({ message: "Ban da vao he thong" }); // sử dụng res là kết thúc luôn middleware
};

// module.exports = { router }; // xuat ra object
// module.exports = router;
module.exports = { register, login, testPrivate, uploadAvatar };
