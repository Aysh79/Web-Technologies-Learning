const session = require("express-session");

const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");


const express = require("express");
const mongoose = require("mongoose");

const app = express();

const productRoutes = require("./routes/productRoutes");

const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const adminRoutes = require("./routes/adminRoutes");

app.use(adminRoutes);

const authRoutes =
    require("./routes/authRoutes");

app.use(authRoutes);


const PORT = 3000;

// EJS
app.set("view engine", "ejs");

app.set(
    "views",
    path.join(__dirname, "views")
);


// DATABASE
mongoose.connect("mongodb://localhost:27017/ecommerce")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

app.use(

    session({

        secret: "netflixsecret",

        resave: false,

        saveUninitialized: false,

        store: MongoStore.create({

            mongoUrl:
                "mongodb://127.0.0.1:27017/netflixStore"

        }),

        cookie: {

            maxAge: 1000 * 60 * 60 * 24

        }

    })

);

app.use(flash());

app.use((req, res, next) => {

    res.locals.currentUser =
        req.session.user || null;

    res.locals.success =
        req.flash("success");

    res.locals.error =
        req.flash("error");

    next();

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