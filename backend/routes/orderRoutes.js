const express = require("express");
const router = express.Router();
const {
  createOrder,
  verifyPayment,
  getOrders,
  deleteOrder,
  handleCOD,
} = require("../controller/orderController");
const protect = require("../middleware/authMiddleware");

router.route("/").post(protect, createOrder).get(protect, getOrders);
router.post("/cod", protect, handleCOD);
router.post("/verifyPayment", protect, verifyPayment);
router.delete("/:orderId", protect, deleteOrder);

module.exports = router;
