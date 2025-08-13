const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  deleteProduct,
} = require("../controller/productController");
const upload = require("../controller/fileHandler");

router.post("/submit", upload.single("image"), createProduct);
router.get("/", getProducts);
router.delete("/delete", deleteProduct);

module.exports = router;
