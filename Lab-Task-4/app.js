const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const flash = require("connect-flash");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ecommerce";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev-session-secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
    }),
  })
);

app.use(flash());

app.use("/api/v1/auth", require("./routes/api/authApiRoutes"));
app.use("/api/v1/products", require("./routes/api/productApiRoutes"));
app.use("/api/v1/orders", require("./routes/api/orderApiRoutes"));
app.use("/api/v1/user", require("./routes/api/userApiRoutes"));

app.use("/api", (req, res) => {
  res.status(404).json({ message: "API route not found" });
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
