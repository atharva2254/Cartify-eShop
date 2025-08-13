const Products = require("../models/product");

const createProduct = async (req, res) => {
  const { product_name, mrp, price, description, category, stock } = req.body;
  const imageUrl = req.file ? req.file.path : "";
  const product = new Products({
    product_name,
    mrp,
    price,
    description,
    category,
    stock,
    imageUrl,
  });

  await product.save();
  return res.status(201).json({
    message: "Product added successfully!",
  });
};

const getProducts = async (req, res) => {
  const products = await Products.find();
  return res.json(products);
};

const deleteProduct = async (req, res) => {
  const { product_name } = req.body;
  try {
    const product = await Products.findOne({ product_name });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error!", error });
  }
};
module.exports = { createProduct, getProducts, deleteProduct };
