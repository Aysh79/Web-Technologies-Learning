const express = require("express");
const mongoose = require("mongoose");

const app = express();

const productRoutes = require("./routes/productRoutes");

const path = require("path");

app.use(express.static(path.join(__dirname, "public")));


const PORT = 3000;

// EJS
app.set("view engine", "ejs");


// DATABASE
mongoose.connect("mongodb://localhost:27017/ecommerce")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});


// ROUTES
app.use(productRoutes);


app.get("/", (req, res) => {
    res.render("index");
});


// app.listen(PORT, () => {
//     console.log(`Server Running on port ${PORT}`);
// });


app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
    console.log("MongoDB Connected");

    

});