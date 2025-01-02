const express = require("express");  //import express
const mongoose = require("mongoose"); //import mongoose
const cors = require("cors"); //import cors
const dotenv = require("dotenv"); //import .env
const recipeRoutes = require("./routes/recipes"); //import recipe routes
const bodyParser = require("body-parser"); //import body parsere
 const Recipe = require("./models/Recipe"); //import recipe from models   
 
//for .env 
dotenv.config();

//calling functions
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
const path = require("path");

//file system calling function
const fs = require("fs");

//taking images for search enquiry
const imagesPath = path.join(__dirname, "../login-app/public/images");
console.log(__dirname, imagesPath);
console.log(imagesPath);
if (fs.existsSync(imagesPath)) {

  app.use("/images", express.static(imagesPath));
  console.log("Serving static files from 'images' folder...");
} else {

  console.error(
    "Error: 'images' folder not found. Please check the folder path."
  );
  process.exit(1); 
}

/* const token = localStorage.getItem("token");
if (!token) {
  // Redirect to login
}  */


  //adding recipes in database
 const testRecipes = [
  /* {
    title: "Paneer Butter Masala",
    description: "Delicious paneer curry",
    duration: "30m",
    rating: 4.5,
    image: "/images/paneer2.jpeg",
  },
  {
    title: "Chicken Biryani",
    description: "Spicy and flavorful biryani",
    duration: "1h",
    rating: 4.7,
    image: "/images/briyani.jpeg",
  },
  {
    title: "Channa Masala",
    duration: "35m",
    rating: 4.8,
    description:
      "Channa masala is North Indian curried dish made with white chickpeas, onions.",
    image: "/images/channa.jpeg",
  },
  {
    title: "Carrot Halwa",
    duration: "45m",
    rating: 4.6,
    description:
      "Carrot halwa is a carrot-based sweet dessert pudding made by placing grated carrot in milk.",
    image: "/images/carrot.jpeg",
  },
  {
    title: "Tandoori Chicken",
    duration: "2h 0m",
    rating: 4.7,
    description:
      "Tandoori chicken is a dish made from chicken marinated in yogurt and spices.",
    image: "/images/chicken.jpeg",
  }, */
];

Recipe.insertMany(testRecipes)
  .then(() => console.log("Test recipes added"))
  .catch((err) => console.error("Error adding test recipes:", err));  



  // schema for comments
const commentSchema = new mongoose.Schema({
  name: String,
  email: String,
  comment: String,
  rating: Number,
});

const Comment = mongoose.model("Comment", commentSchema);

// routes
app.post("/api/comments", async (req, res) => {
  try {
    const { name, email, comment, rating } = req.body;
    const newComment = new Comment({ name, email, comment, rating });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Error saving comment", error });
  }
});

app.get("/api/comments", async (req, res) => {
  try {
    const comments = await Comment.find().sort({ _id: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving comments", error });
  }
});

// maongodb connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log("MongoDB Connection Error:", error));

// recipe routes
app.use("/api/recipes", recipeRoutes);
// auth routes
app.use("/api/auth", require("./routes/auth"));

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


