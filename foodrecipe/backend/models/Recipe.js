//import mongoose
const mongoose = require("mongoose");


//mongoose schema for recipe
const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true }, 
  description: { type: String, required: true }, 
  duration: { type: String, required: true }, 
  rating: { type: Number, required: true, min: 0, max: 5 }, 
  image: { type: String, required: true }, 
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;

