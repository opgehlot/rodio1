const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();

console.log("🚀 Starting Server...");

app.use(cors());
app.use(express.json());

console.log("📦 Middleware Loaded");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err.message));

app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("✅ Server Running on http://localhost:5000");
});