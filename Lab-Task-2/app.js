const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// route
app.get("/", (req, res) => {
  res.render("index");
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});