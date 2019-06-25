// 3rd packages
const express = require("express");
const mongoose = require("mongoose");

//lodash thư viện cung cấp nhiều tính năng cho js
// npm i lodash --save
// npm i bcryptjs --save   bcryptjs để tạo ra chuỗi tăng bảo mật

mongoose
  .connect("mongodb://localhost:27017/xedike", { userNewUrlParser: true })
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log("TCL: err", err));

// tạo server bằng express
const app = express();

//middleware
//parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2 control cors bằng server
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

//static
//uploads là đường dẫn trên browser upload là folder trong source
app.use("/uploads", express.static("upload"));

// handle middleware router
// app.get()
// app.post()
// app.use("/",require("./routes/api/user").router);  khi xuat ra object
app.use("/api/users", require("./routes/api/users")); // khi xuat ra het

//Trip
app.use("/api/trips", require("./routes/api/trips"));

//my package
// nếu biến môi trường process.env.PORT ko có thì lấy là 5000
const port = process.env.PORT || 5000; // đáp ứng được nhiều port khác nhau thì có thể tùy ứng biến.
app.listen(port, () => {
  // console.log(`Server is running on port ${port} !`);
});
