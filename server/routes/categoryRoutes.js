const express = require("express");
const router = express.Router();
const {
  addCategory,
  getCategories,
} = require("../controller/categoryController");

router.post("/", addCategory);

router.get("/", getCategories);

module.exports = router;
