const express = require("express");
const app = express();
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// Serve frontend
app.use(express.static(path.join(__dirname, "../app/dist"))); // CRA
// or "../app/dist" if Vite

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../app/dist", "index.html"));
});

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
