const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analytics.controller");

// Sales trend (monthly)
router.get("/sales-trend", analyticsController.getSalesTrend);

// Top products
router.get("/top-products", analyticsController.getTopProducts);

// Region-wise sales
router.get("/region-sales", analyticsController.getRegionSales);

module.exports = router;
