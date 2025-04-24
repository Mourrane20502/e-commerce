const Category = require("../model/category/Category");

const addCategory = async (req, res) => {
  const { name, description, imageUrl } = req.body;

  try {
    const newCategory = new Category({
      name,
      description,
      imageUrl,
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addCategory,
  getCategories,
};
