const express = require("express");
const Product = require("../models/product");
const router = express.Router();

//fetch all products Api

router.get("/", async (req, res) => {
  const { search, category } = req.body;
  let query = {};

  // Handle search term
  if (search) {
    query.$or = [{ title: { $regex: search, $options: "i" } }];
  }

  if (category) {
    query.category = category;
  }

  try {
    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//adding a new product

router.post("/", async (req, res) => {
  const { title, description, image, price, category, quantity } = req.body;
  const product = new Product({
    title,
    description,
    image,
    price,
    category,
    quantity,
  });

  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
