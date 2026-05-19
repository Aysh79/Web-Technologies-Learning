const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { isLoggedIn } = require("../middleware/authMiddleware");

function redirectLoggedInUser(req, res, next) {
  if (!req.session.user) return next();
  return res.redirect(req.session.user.role === "admin" ? "/admin" : "/");
}

// Register
router.get("/register", redirectLoggedInUser, (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  try {
    const name = (req.body.name || "").trim();
    const email = (req.body.email || "").trim().toLowerCase();
    const password = req.body.password || "";

    if (!name || !email || !password) {
      req.flash("error", "All fields are required.");
      return res.redirect("/register");
    }

    if (password.length < 6) {
      req.flash("error", "Password must be at least 6 characters long.");
      return res.redirect("/register");
    }

    const exists = await User.findOne({ email });
    if (exists) {
      req.flash("error", "An account with this email already exists.");
      return res.redirect("/register");
    }

    await User.create({ name, email, password });

    req.flash("success", "Account created successfully. Please log in.");
    return res.redirect("/login");
  } catch (err) {
    console.log(err);

    if (err.code === 11000) {
      req.flash("error", "An account with this email already exists.");
    } else if (err.name === "ValidationError") {
      req.flash("error", Object.values(err.errors).map(error => error.message).join(" "));
    } else {
      req.flash("error", "Registration failed. Please try again.");
    }

    return res.redirect("/register");
  }
});

// Login
router.get("/login", redirectLoggedInUser, (req, res) => {
  if (req.query.logout === "success") {
    res.locals.success = ["You have successfully logged out."];
  }

  res.render("login");
});

router.post("/login", async (req, res) => {
  try {
    const email = (req.body.email || "").trim().toLowerCase();
    const password = req.body.password || "";

    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error", "Invalid email or password.");
      return res.redirect("/login");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      req.flash("error", "Invalid email or password.");
      return res.redirect("/login");
    }

    req.session.regenerate(err => {
      if (err) {
        console.log(err);
        req.flash("error", "Login failed. Please try again.");
        return res.redirect("/login");
      }

      req.session.user = {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role
      };

      req.flash("success", `Welcome back, ${user.name}!`);
      return res.redirect(user.role === "admin" ? "/admin" : "/");
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Login failed. Please try again.");
    return res.redirect("/login");
  }
});

// Protected user pages
router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile");
});

router.get("/checkout", isLoggedIn, (req, res) => {
  res.send("Checkout page - only logged-in users can access this.");
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) console.log(err);
    res.clearCookie("connect.sid");
    res.redirect("/login?logout=success");
  });
});

module.exports = router;
