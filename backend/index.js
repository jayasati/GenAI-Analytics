require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// ✅ Create app FIRST
const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Routes
const analyticsRoutes = require("./routes/analytics.routes");
app.use("/api/analytics", analyticsRoutes);

const aiRoutes = require("./routes/ai.routes");
app.use("/api/ai", aiRoutes);


// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// ✅ Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
