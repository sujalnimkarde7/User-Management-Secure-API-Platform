const express = require("express");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/dashboard", protect, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  res.json({ message: "Welcome Admin" });
});

module.exports = router;
