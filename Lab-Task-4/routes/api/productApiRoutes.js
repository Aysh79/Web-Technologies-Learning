const express = require("express");
const router = express.Router();
const Product = require("../../models/product");

router.get("/", async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 8, 1), 50);
    const skip = (page - 1) * limit;
    const search = (req.query.search || "").trim();
    const category = (req.query.category || "").trim();
    const minPrice = Number(req.query.minPrice || 0);
    const maxPrice = Number(req.query.maxPrice || 10000000);
    const sort = req.query.sort || "";

    const filter = {
      price: {
        $gte: Number.isNaN(minPrice) ? 0 : minPrice,
        $lte: Number.isNaN(maxPrice) ? 10000000 : maxPrice,
      },
    };

    if (search) filter.name = { $regex: search, $options: "i" };
    if (category) filter.category = category;

    const sortOption = {};
    if (sort === "priceLow") sortOption.price = 1;
    if (sort === "priceHigh") sortOption.price = -1;
    if (sort === "ratingHigh") sortOption.rating = -1;

    const totalProducts = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    res.json({
      products,
      pagination: {
        page,
        limit,
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid product id" });
    }

    res.status(500).json({ message: "Error fetching product", error: err.message });
  }
});

module.exports = router;
