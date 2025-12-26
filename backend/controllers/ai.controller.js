const Sales = require("../models/Sales");

exports.askAI = async (req, res) => {
  try {
    const { question } = req.body;
    const q = question.toLowerCase();

    let result;

    if (q.includes("monthly") || q.includes("trend")) {
      result = await Sales.aggregate([
        {
          $group: {
            _id: { $month: "$orderDate" },
            totalSales: { $sum: "$salesAmount" }
          }
        },
        { $sort: { "_id": 1 } }
      ]);

      return res.json({
        insight: "Monthly Sales Trend",
        data: result
      });
    }

    if (q.includes("region")) {
      result = await Sales.aggregate([
        {
          $group: {
            _id: "$region",
            totalSales: { $sum: "$salesAmount" }
          }
        }
      ]);

      return res.json({
        insight: "Sales by Region",
        data: result
      });
    }

    if (q.includes("product")) {
      result = await Sales.aggregate([
        {
          $group: {
            _id: "$product",
            totalSales: { $sum: "$salesAmount" }
          }
        },
        { $sort: { totalSales: -1 } }
      ]);

      return res.json({
        insight: "Top Selling Products",
        data: result
      });
    }

    if (q.includes("total revenue") || q.includes("total sales")) {
      result = await Sales.aggregate([
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$salesAmount" }
          }
        }
      ]);

      return res.json({
        insight: "Total Revenue",
        data: result[0]
      });
    }

    res.json({
      insight: "Unknown question",
      suggestion: [
        "Show sales trend",
        "Sales by region",
        "Top products",
        "Total revenue"
      ]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI processing failed" });
  }
};
