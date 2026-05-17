const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken");
const Order = require("../../models/Order");
const Product = require("../../models/product");

router.post("/", verifyToken, async (req, res) => {
  try {
    const items = Array.isArray(req.body.items) ? req.body.items : [];

    if (items.length === 0) {
      return res.status(400).json({ message: "Order items are required" });
    }

    const productIds = items.map(item => item.product || item.productId);
    const products = await Product.find({ _id: { $in: productIds } });
    const productsById = new Map(products.map(product => [product._id.toString(), product]));

    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const productId = item.product || item.productId;
      const quantity = Number(item.quantity || 1);
      const product = productsById.get(String(productId));

      if (!product) {
        return res.status(400).json({ message: `Product not found: ${productId}` });
      }

      if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({ message: "Each item quantity must be at least 1" });
      }

      orderItems.push({
        product: product._id,
        quantity,
        price: product.price,
      });

      totalAmount += product.price * quantity;
    }

    const order = await Order.create({
      user: req.user.user_id || req.user.userId,
      items: orderItems,
      totalAmount,
    });

    res.status(201).json({
      message: "Order placed",
      order,
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid product id" });
    }

    res.status(500).json({ message: "Error creating order", error: err.message });
  }
});

module.exports = router;
