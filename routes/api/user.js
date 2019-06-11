const express = require("express");
const router = express.Router();
const {User} = require("../../models/users");

// route   POST  /api/users/register
// desc    register new user
// access  PUBLIC
router.post("/register",(req,res) =>{
    // console.log("TCL: res", res.body);
    // res.send(req.body);
    const {email,passWord,fullName,userType,phone,dateOfBirth} = req.body;

    const newUser = new User({
        email,passWord,fullName,userType,phone,dateOfBirth
    })
    newUser.save()
    .then(user=> res.status(200).json(user)) // success
    .catch(err => res.status(400).json(err)) // err
})






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

// module.exports = { router }; // xuat ra object
module.exports = router;
