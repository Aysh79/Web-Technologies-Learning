const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken");
const User = require("../../models/User");

router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.user_id || req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile", error: err.message });
  }
});

module.exports = router;
