//import express
const express = require("express");
//import recipe from model
const Recipe = require("../models/Recipe");
//create new router
const router = express.Router();

// search recipes
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
