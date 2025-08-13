const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
        quantity: Number,
      },
    ],
    amount: Number,
    paymentStatus: { type: Boolean, default: false },
    paymentMethod: { type: String, enum: ["Cod", "Razorpay"] },
    orderStatus: {
      type: String,
      enum: ["placed", "shipped", "delivered"],
      default: "placed",
    },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Orders", orderSchema);
