const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Explicitly set views folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Route
app.get("/", (req, res) => {
  res.render("index");
});

// Test __dirname
console.log("__dirname =", __dirname);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});