const Product = require("../model/product/Product");

const addProduct = async (req, res) => {
  const { name, description, price, category, stock, image, rating } = req.body;
  try {
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      image,
      rating: rating || 0,
    });

    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { addProduct, getOrders };
