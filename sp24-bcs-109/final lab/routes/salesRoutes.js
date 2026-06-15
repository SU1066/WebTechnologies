const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const salesController = require("../controllers/salesController");

const requireAdminJson = (req, res, next) => {
    if (!req.session.adminId) {
        return res.status(401).json({ message: "Admin login required" });
    }

    next();
};

router.get("/sales", auth, salesController.renderSalesDashboard);
router.get("/api/sales-data", requireAdminJson, salesController.getSalesData);

module.exports = router;
