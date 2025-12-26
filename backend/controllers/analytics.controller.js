const Sales = require("../models/Sales");

/**
 * GET /api/analytics/sales-trend
 * Returns monthly sales trend
 */
exports.getSalesTrend = async (req, res) => {
  try {
    const result = await Sales.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$orderDate" },
            month: { $month: "$orderDate" }
          },
          totalSales: { $sum: "$salesAmount" },
          totalOrders: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /api/analytics/top-products
 */
exports.getTopProducts = async (req, res) => {
  try {
    const result = await Sales.aggregate([
      {
        $group: {
          _id: "$product",
          revenue: { $sum: "$salesAmount" },
          quantitySold: { $sum: "$quantity" }
        }
      },
      { $sort: { revenue: -1 } },
      { $limit: 5 }
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /api/analytics/region-sales
 */
exports.getRegionSales = async (req, res) => {
  try {
    const result = await Sales.aggregate([
      {
        $group: {
          _id: "$region",
          totalSales: { $sum: "$salesAmount" }
        }
      }
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
