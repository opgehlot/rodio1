const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    console.log("==================================");
    console.log("📥 Register API Called");
    console.log("Request Body:", req.body);

    const user = await User.create(req.body);

    console.log("✅ User Saved Successfully");
    console.log(user);

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data: user,
    });
  } catch (error) {
    console.log("❌ Register API Error");
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;