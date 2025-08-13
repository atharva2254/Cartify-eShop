const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    product_name: { type: String, required: true },
    price: { type: Number, required: true },
    mrp: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", productSchema);
