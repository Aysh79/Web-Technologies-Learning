const express = require("express");
const mongoose = require("mongoose");

const app = express();


// EJS
app.set("view engine", "ejs");


// DATABASE CONNECTION
mongoose.connect("mongodb://localhost:27017/ecommerce")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});


// ROUTE
app.get("/", (req, res) => {
    res.send("Home Page");
});


app.listen(3000, () => {
    console.log("Server Running");
});