const express = require("express");
const app = express();
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(
  cors({
    origin: "https://cartify-e-shop.vercel.app",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => {
  res.send("<h1>Server is Live</h1>");
});

app.use("/products", productRoutes);
app.use("/user", userRoutes);
app.use("/user/orders", orderRoutes);
module.exports = app;
