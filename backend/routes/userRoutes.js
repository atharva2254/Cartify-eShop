const express = require("express");
const router = express.Router();
const {
  createUser,
  getMe,
  userLogin,
  updatePassword,
  logoutUser,
  addToCart,
  removeFromCart,
  getCartItems,
  updateAddress,
} = require("../controller/userController");

const protect = require("../middleware/authMiddleware");

router.post("/create", createUser);
router.post("/logout", protect, logoutUser);
router.get("/me", protect, getMe);
router.post("/login", userLogin);
router.patch("/update/password", updatePassword);
router.patch("/update/address", protect, updateAddress);
router.route("/cart").get(protect, getCartItems).put(protect, addToCart);
// .delete(protect, removeFromCart);
router.delete("/cart/:product_id", protect, removeFromCart);

module.exports = router;
