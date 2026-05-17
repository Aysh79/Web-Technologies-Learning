const express  = require("express");
const mongoose = require("mongoose");
const session  = require("express-session");
const { MongoStore } = require("connect-mongo");
const flash = require("connect-flash");
const path = require("path");

const app = express();

// ── VIEW ENGINE ─────────────────────────────
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ── STATIC + BODY ───────────────────────────
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ── DB ───────────────────────────────────────
mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ── SESSION (FIXED FOR ALL VERSIONS) ────────
app.use(
  session({
    secret: "netflixsecret",
    resave: false,
    saveUninitialized: false,

    // ✔ SAFE FIX (works for old + new connect-mongo)
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/ecommerce",
      collectionName: "sessions",
    }),

    cookie: { maxAge: 1000 * 60 * 60 * 24 }
  })
);

// ── FLASH ───────────────────────────────────
app.use(flash());

// ── LOCALS ──────────────────────────────────
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// ── ROUTES ──────────────────────────────────
app.use(require("./routes/authRoutes"));
app.use(require("./routes/adminRoutes"));
app.use(require("./routes/productRoutes"));

// ── HOME ────────────────────────────────────
app.get("/", (req, res) => {
  res.render("index");
});

// ── START ───────────────────────────────────
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
