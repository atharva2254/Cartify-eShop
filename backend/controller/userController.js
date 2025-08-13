const User = require("../models/user");
const Products = require("../models/product");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Handles user registration
const createUser = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const userExists = await User.findOne({ email, phone });
    if (!userExists) {
      const hashPass = await bcrypt.hash(password, 10);

      const newUser = new User({ name, email, phone, password: hashPass });
      await newUser.save();
      const token = generateToken(newUser._id);

      return res
        .status(201)
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          maxAge: 10 * 24 * 60 * 60 * 1000, //10 days
        })
        .json({ message: "User created successfully", generatedToken: token });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ message: "Email or Phone already Exists! Please Login" });
  }
};

// Handles user Login
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not Found!" });
    }

    const unhashedPass = await bcrypt.compare(password, user.password);
    const token = generateToken(user._id);
    if (unhashedPass) {
      res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          maxAge: 10 * 24 * 60 * 60 * 1000,
        })
        .json({ message: "Login Successful", generatedToken: token });
    } else {
      return res.status(404).json({ message: "Invalid credential!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error!" });
  }
};

const updateAddress = async (req, res) => {
  const { lane, town, city, state, pincode } = req.body.address;
  const user = req.user._id;
  try {
    const updatedUser = await User.findOneAndUpdate(
      user,
      {
        address: {
          lane: lane,
          town: town,
          city: city,
          state: state,
          pincode: pincode,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Address upated!",
      updatedUser: { name: updatedUser.name, address: updatedUser.address },
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Adding product to user's cart
const addToCart = async (req, res) => {
  const { product_id } = req.body;
  const user = req.user;
  try {
    const cartItem = await Products.findById(product_id);
    if (!cartItem) {
      return res.status(404).json({ message: "Product not Found!" });
    }

    const customer = await User.findById(user._id);

    let itemFound = false;
    for (let item of customer.cart) {
      if (item.productId.toString() === product_id.toString()) {
        item.quantity += 1;
        itemFound = true;
      }
    }

    if (!itemFound) {
      customer.cart.push({
        productId: product_id,
        quantity: 1,
      });
    }
    await customer.save();

    return res.status(200).json({ message: "Product added" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error!" });
  }
};

// Get user's profile through token
const getMe = async (req, res) => {
  return res.status(200).json({
    message: "Verified ✅",
    _id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    phone: req.user.phone,
    address: req.user.address,
    joined: req.user.createdAt,
    role: req.user.role,
    cart: req.user.cart,
    orders: req.user.orders,
  });
};

// Handles logout
const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });

  return res.json({ message: "User logged out successfully" });
};

// Update User
const updatePassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const hashedPass = await bcrypt.hash(newPassword, 10);
    const updatedPass = await User.findOneAndUpdate(
      { email },
      { password: hashedPass },
      { new: true }
    );

    if (!updatedPass) {
      return res.status(404).json("User not found");
    }

    return res.status(200).json("Password Updated successfully!");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server Error!");
  }
};

// Handles token generation
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "10d" });
};

const getCartItems = async (req, res) => {
  try {
    const cartItems = req.user.cart;
    return res.status(200).json(cartItems);
  } catch (error) {
    console.log("Error while fetching cart: ", error);
    return res.status(500).json({ message: "Error while fetching products" });
  }
};

// Remove item from cart:
const removeFromCart = async (req, res) => {
  try {
    const { product_id } = req.params;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const initialLength = user.cart.length;

    // Filter out the item
    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== product_id.toString()
    );

    if (user.cart.length === initialLength) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    await user.save();
    return res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Remove from cart error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createUser,
  getMe,
  userLogin,
  updatePassword,
  logoutUser,
  addToCart,
  removeFromCart,
  getCartItems,
  updateAddress,
};
