
const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true }, // String, required field
  description: { type: String, required: true }, // String, required field
  duration: { type: String, required: true }, // String, required field
  rating: { type: Number, required: true, min: 0, max: 5 }, // Number, required field with validation
  image: { type: String, required: true }, // String, required field
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;

