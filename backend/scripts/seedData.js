require("dotenv").config();
const mongoose = require("mongoose");
const Sales = require("../models/Sales");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to InsightGPT DB"))
  .catch(err => {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  });

const products = ["Laptop", "Phone", "Tablet", "Monitor"];
const categories = ["Electronics"];
const regions = ["North", "South", "East", "West"];

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

async function seed() {
  const data = [];

  for (let i = 0; i < 500; i++) {
    data.push({
      orderId: `ORD-${i}`,
      orderDate: randomDate(new Date(2024, 6, 1), new Date()),
      product: products[Math.floor(Math.random() * products.length)],
      category: categories[0],
      region: regions[Math.floor(Math.random() * regions.length)],
      salesAmount: Math.floor(Math.random() * 2000) + 100,
      quantity: Math.floor(Math.random() * 5) + 1
    });
  }

  const result = await Sales.insertMany(data);

  console.log(`✅ Inserted ${result.length} records`);
  process.exit();
}

seed();
