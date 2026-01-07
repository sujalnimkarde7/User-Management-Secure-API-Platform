const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// GET PROFILE
router.get("/profile", protect, async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password");
  res.json(user);
});

// UPDATE NAME
router.put("/profile", protect, async (req, res) => {
  const user = await User.findById(req.user.userId);
  user.name = req.body.name || user.name;
  await user.save();
  res.json({ message: "Profile updated" });
});

// CHANGE PASSWORD
router.put("/change-password", protect, async (req, res) => {
  const user = await User.findById(req.user.userId);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  await user.save();
  res.json({ message: "Password changed" });
});

module.exports = router;
