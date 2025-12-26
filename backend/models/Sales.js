const mongoose = require("mongoose");

const SalesSchema = new mongoose.Schema({
  orderId: String,
  orderDate: Date,
  product: String,
  category: String,
  region: String,
  salesAmount: Number,
  quantity: Number
});

// 👇 FORCE correct collection
module.exports = mongoose.model(
  "Sales",     // Model name
  SalesSchema,
  "Sales"      // Collection name in MongoDB
);
