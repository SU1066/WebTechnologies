const express = require("express");
const router = express.Router();

const apiController = require("../controllers/apiController");
const verifyToken = require("../middleware/verifyToken");

router.get("/products", apiController.getProducts);
router.get("/products/:id", apiController.getProductById);
router.post("/auth/login", apiController.login);
router.get("/user/profile", verifyToken, apiController.getProfile);
router.post("/orders", verifyToken, apiController.createOrder);

module.exports = router;
