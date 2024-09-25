const express = require("express");
const Product = require("../models/product");
const router = express.Router();

// Fetch all products API
router.get("/", async (req, res) => {
  const { search, category } = req.query;
  let query = {};

  // Handle search term
  if (search) {
    const trimmedSearch = search.trim();
    query.$or = [
      { title: { $regex: trimmedSearch, $options: "i" } },
      { description: { $regex: trimmedSearch, $options: "i" } },
    ];
  }

  // Handle category filter
  if (category) {
    const trimmedCategory = category.trim();
    query.category = {
      $regex: new RegExp(`^${trimmedCategory.replace(/\s+/g, "\\s*")}$`, "i"),
    };
  }

  try {
    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: error.message });
  }
});

// Adding a new product
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
    console.error("Error saving product:", error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
