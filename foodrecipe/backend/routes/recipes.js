const express = require("express");
const Recipe = require("../models/Recipe");

const router = express.Router();

// Search for recipes based on the query string
router.get("/search", async (req, res) => {
  const query = req.query.q || "";
  try {
    const recipes = await Recipe.find({
      title: { $regex: query, $options: "i" },
    });
    console.log(recipes);
    res.json(recipes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error searching for recipes" });
  }
});

module.exports = router;
