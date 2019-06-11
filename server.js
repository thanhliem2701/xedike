// 3rd packages
const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/xedike",{userNewUrlParser:true})
.then(()=> console.log("Connected to DB"))
.catch(err => console.log("TCL: err", err))

const app = express();

//my package
// nếu biến môi trường process.env.PORT ko có thì lấy là 5000
const port = process.env.PORT||5000;  // đáp ứng được nhiều port khác nhau thì có thể tùy ứng biến.
app.listen(port,() => {
    console.log(`Server is running on port ${port} !`);
})