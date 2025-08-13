const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    address: {
      lane: String,
      town: String,
      city: String,
      pincode: Number,
      state: String,
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Orders" }],
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    cart: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
        quantity: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
