const express = require("express");
const router = express.Router();
const Order = require("../../models/Order");

router.get("/sales-data", async (req, res) => {
  try {
    const isAdmin = req.session.user && req.session.user.role === "admin";
    const stats = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
          totalOrders: { $sum: 1 }
        }
      }
    ]);

    const topProduct = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.product",
          totalSold: { $sum: "$items.quantity" }
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }
      },
      {
        $unwind: {
          path: "$product",
          preserveNullAndEmptyArrays: true
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 1 }
    ]);

    const data = {
      totalOrders: stats[0]?.totalOrders || 0,
      topProduct: topProduct[0]?.product?.name || "N/A"
    };

    if (isAdmin) {
      data.totalRevenue = stats[0]?.totalRevenue || 0;
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
