// 3rd packages
const express = require("express");

const app = express();

//my package

app.listen(5000,() => {
    console.log("Server is running on port 5000");
})