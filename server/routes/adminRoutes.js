const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const adminController = require("../controller/adminController");
router.post(
  "/add-product",
  verifyToken,
  verifyAdmin,
  adminController.addProduct
);

router.get("/orders", verifyToken, verifyAdmin, adminController.getOrders);

module.exports = router;
