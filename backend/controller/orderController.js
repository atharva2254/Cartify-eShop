// routes/payment.js or wherever you keep routes
const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();
const Orders = require("../models/orders");
const User = require("../models/user");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const handleCOD = async (req, res) => {
  const { amount, items } = req.body;
  try {
    const savedOrder = await Orders.create({
      user: req.user._id,
      items: items,
      amount: amount,
      paymentStatus: false,
      paymentMethod: "Cod",
    });

    await User.findByIdAndUpdate(savedOrder.user, {
      $push: { orders: savedOrder._id },
      $set: { cart: [] },
    });

    return res.status(200).json({ message: "Order Placed!" });
  } catch (error) {
    console.log("Error in cod", error);
    return res.status(500);
  }
};

// Create Order
const createOrder = async (req, res) => {
  try {
    const { amount, items } = req.body;
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "cartify_rcpt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    const savedOrder = await Orders.create({
      user: req.user._id,
      items: items,
      amount: amount,
      paymentMethod: "Razorpay",
      razorpayOrderId: order.id,
    });

    await User.findByIdAndUpdate(savedOrder.user, {
      $push: { orders: savedOrder._id },
       $set: { cart: [] },
    });

    return res.json({
      orderId: order.id,
      savedOrder,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create order" });
  }
};

const getOrders = async (req, res) => {
  try {
    const user = req.user;

    const userOrders = await Orders.find({
      _id: { $in: user.orders },
    })
      .populate({
        path: "items.productId",
        select: "product_name price imageUrl category",
      })
      .select("items updatedAt amount paymentStatus paymentMethod orderStatus");

    if (!userOrders) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(userOrders);
  } catch (error) {
    console.log("Error while fetching user's order ", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const deletedOrder = await Orders.findOneAndDelete({
      razorpayOrderId: orderId,
    });

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found!" });
    }
    await User.updateOne(
      { _id: deletedOrder.user },
      { $pull: { orders: deletedOrder._id } }
    );

    return res.status(200).json({ message: "Order Deleted!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Request failed!" });
  }
};

// Payment Verification
const verifyPayment = async (req, res) => {
  const { order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const hmac = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (hmac === razorpay_signature) {
    // Payment is verified
    await Orders.findOneAndUpdate(
      { razorpayOrderId: order_id },
      {
        paymentStatus: true,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
      { new: true }
    );

    return res.status(200).json({ success: true });
  } else {
    const failedOrder = await Orders.findOne({ razorpayOrderId: order_id });

    if (failedOrder) {
      await User.findByIdAndUpdate(failedOrder.user, {
        $pull: { orders: failedOrder._id },
      });
      await Orders.findByIdAndDelete(failedOrder._id);
    }
    return res
      .status(400)
      .json({ success: false, message: "Invalid signature" });
  }
};

module.exports = {
  verifyPayment,
  createOrder,
  getOrders,
  deleteOrder,
  handleCOD,
};
