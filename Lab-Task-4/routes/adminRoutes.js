const fs      = require("fs");
const path    = require("path");
const express = require("express");
const router  = express.Router();
const multer  = require("multer");

const Product = require("../models/product");
const { isAdmin } = require("../middleware/authMiddleware");

// ── FILE UPLOAD CONFIG ───────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads"),
  filename:    (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ── DASHBOARD ────────────────────────────────────────────────
router.get("/admin", isAdmin, async (req, res) => {
  const products = await Product.find();
  res.render("admin/dashboard", { products });
});

// ── ADD PRODUCT (form) ───────────────────────────────────────
router.get("/admin/add", isAdmin, (req, res) => {
  res.render("admin/addProduct");
});

// ── ADD PRODUCT (submit) ─────────────────────────────────────
router.post("/admin/add", isAdmin, upload.single("image"), async (req, res) => {
  try {
    await Product.create({
      name:     req.body.name,
      price:    req.body.price,
      category: req.body.category,
      stock:    req.body.stock,
      rating:   req.body.rating,
      image:    "/uploads/" + req.file.filename,
    });
    req.flash("success", "Product added successfully.");
    res.redirect("/admin");
  } catch (err) {
    console.error(err);
    req.flash("error", "Failed to add product.");
    res.redirect("/admin/add");
  }
});

// ── EDIT PRODUCT (form) ──────────────────────────────────────
router.get("/admin/edit/:id", isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render("admin/editProduct", { product });
  } catch (err) {
    console.error(err);
    res.redirect("/admin");
  }
});

// ── EDIT PRODUCT (submit) ────────────────────────────────────
router.post(
  "/admin/edit/:id",
  isAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const updatedData = {
        name:     req.body.name,
        price:    req.body.price,
        category: req.body.category,
        stock:    req.body.stock,
        rating:   req.body.rating,
      };
      if (req.file) updatedData.image = "/uploads/" + req.file.filename;

      await Product.findByIdAndUpdate(req.params.id, updatedData);
      req.flash("success", "Product updated.");
      res.redirect("/admin");
    } catch (err) {
      console.error(err);
      res.redirect("/admin");
    }
  }
);

// ── DELETE PRODUCT ───────────────────────────────────────────
router.get("/admin/delete/:id", isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product && product.image) {
      const imgPath = path.join(__dirname, "../public", product.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }
    await Product.findByIdAndDelete(req.params.id);
    req.flash("success", "Product deleted.");
    res.redirect("/admin");
  } catch (err) {
    console.error(err);
    res.redirect("/admin");
  }
});

module.exports = router;
