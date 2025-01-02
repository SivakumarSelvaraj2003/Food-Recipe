const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const recipeRoutes = require("./routes/recipes");
const bodyParser = require("body-parser");
 const Recipe = require("./models/Recipe");    

dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
const path = require("path");

const fs = require("fs");

// Define the images folder path
const imagesPath = path.join(__dirname, "../login-app/public/images");
console.log(__dirname, imagesPath);
console.log(imagesPath);
// Check if the images folder exists
if (fs.existsSync(imagesPath)) {
  // Serve static files from the images folder if it exists
  app.use("/images", express.static(imagesPath));
  console.log("Serving static files from 'images' folder...");
} else {
  // Throw an error if the images folder is not found
  console.error(
    "Error: 'images' folder not found. Please check the folder path."
  );
  process.exit(1); // Stop the server
}

/* const token = localStorage.getItem("token");
if (!token) {
  // Redirect to login
}  */

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



  // Comment Schema
const commentSchema = new mongoose.Schema({
  name: String,
  email: String,
  comment: String,
  rating: Number,
});

const Comment = mongoose.model("Comment", commentSchema);

// Routes
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

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log("MongoDB Connection Error:", error));

// Use the recipe routes
app.use("/api/recipes", recipeRoutes);
// Routes
app.use("/api/auth", require("./routes/auth"));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


