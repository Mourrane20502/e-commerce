const Product = require("../model/product/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id).populate("category");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ success: true, product });
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

module.exports = { getProducts, getProductById };
