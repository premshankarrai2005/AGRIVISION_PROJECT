const express = require("express");
const authorize = require("../middleware/roleMiddleware");

const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", protect, getProfile); 

router.get(
  "/farmer-dashboard",
  protect,
  authorize("farmer"),
  (req, res) => {
    res.json({
      message: "Welcome Farmer",
    });
  }
);

module.exports = router;
