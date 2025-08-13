const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token, Access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findById(decoded.id)
      .select("-password")
      .populate("cart.productId", "product_name price imageUrl category");

    next();
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Authorization failed!" });
  }
};

module.exports = protect;
