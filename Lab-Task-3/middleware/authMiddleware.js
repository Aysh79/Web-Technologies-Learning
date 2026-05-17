function isLoggedIn(req, res, next) {
  if (req.session.user) return next();

  req.flash("error", "You must be logged in to access that page.");
  return res.redirect("/login");
}

function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === "admin") return next();

  if (!req.session.user) {
    req.flash("error", "Please log in as an admin to access the admin panel.");
    return res.redirect("/login");
  }

  req.flash("error", "Access Denied: Admins only.");
  return res.redirect("/");
}

module.exports = { isLoggedIn, isAdmin };
