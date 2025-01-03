import React, { useState, useEffect } from "react";
import "./Recipe.css";
import { FaSearch } from "react-icons/fa";  //for icon
import { useNavigate } from "react-router-dom"; //for navigation
//for AOS animation library
import AOS from "aos";
import "aos/dist/aos.css"; // Import the CSS


// import images
const paneerImage = "/images/paneer2.jpeg";
const carrotImage = "/images/carrot1.jpeg";
const chickenImage = "/images/chicken.jpeg";
const channaImage = "/images/channa.jpeg";
const biryaniImage = "/images/briyani.jpeg";
const vegetableImage = "/images/vegetable.jpeg";
const burgerImage = "/images/burger.png";



// recipe details
const initialRecipes = [
  {
    title: "Paneer Butter Masala",
    duration: "1h 12m",
    rating: 4.5,
    description:
      "Paneer Butter Masala, also known as butter paneer, is a rich & creamy curry made with",
    image: paneerImage,
  },
  {
    title: "Carrot Halwa",
    duration: "45m",
    rating: 4.6,
    description:
      "Carrot halwa is a carrot-based sweet dessert pudding made by placing grated carrot in ...",
    image: carrotImage,
  },
  {
    title: "Tandoori Chicken",
    duration: "2h 0m",
    rating: 4.7,
    description:
      "Tandoori chicken is a dish made from chicken marinated in yogurt and ...",
    image: chickenImage,
  },
  {
    title: "Channa Masala",
    duration: "35m",
    rating: 4.8,
    description:
      "Channa masala is North Indian curried dish made with white chickpeas, ...",
    image: channaImage,
  },
  {
    title: "Chicken Biryani",
    duration: "1h 12m",
    rating: 4.9,
    description:
      "Biryani is a mixed rice dish mainly popular in South Asia. It is made with meat and ...",
    image: biryaniImage,
  },
];

//for search enquiry
function App() {
  const [recipes, setRecipes] = useState(initialRecipes); 
  const [searchQuery, setSearchQuery] = useState("");
  //for navigation
  const navigate = useNavigate(); 

  //for aos animation
  useEffect(() => {
    AOS.init({
      duration: 700, 
      easing: "ease-in-out", 
      once: false, 
    });
  }, []);


  // handle search
  const handleSearch = async (query) => {
    if (!query) {
      setRecipes(initialRecipes); 
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/recipes/search?q=${query}`
      );
      const data = await response.json();
      console.log("API response:", data); 
      setRecipes(data); 
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };


  //fetch recipes
  useEffect(() => {
    handleSearch(searchQuery); 
  }, [searchQuery]);

  // recipe navigation
  const handleRecipeClick = (recipe) => {
    navigate("/recipedetails", { state: { recipe } }); // Navigate with recipe data
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1 className="logo">
          <img
            src={burgerImage}
            alt="Burger"
            style={{
              width: "50px",
              height: "40px",
            }}
          />
          {"Food Recipe"}
        </h1>

        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search recipe"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
        </div>
        {/*    <FaUser className="user-icon" /> */}
      </header>

      {/* Recipe of the Day */}
      <section
        className="recipe-of-the-day"
        data-aos="fade-left"
        data-aos-anchor-placement="center-bottom"
      >
        <div className="highlight">
          <div className="highlight-text">
            <p
              data-aos="fade-right"
              data-aos-offset="300"
              data-aos-delay="300"
              data-aos-easing="ease-in-sine"
              className="highlight-text-p"
            >
              Recipe of the Day
            </p>
            <h3
              data-aos="fade-right"
              data-aos-offset="300"
              data-aos-delay="300"
              data-aos-easing="ease-in-sine"
            >
              Vegetable Sizzler
            </h3>
            <p
              data-aos="fade-right"
              data-aos-offset="300"
              data-aos-delay="300"
              data-aos-easing="ease-in-sine"
              className="recipe-deatails"
            >
              Sizzlers are a favorite with Indians, as they come with sizzler
              plates, thick steaks, rice, stir-fried vegetables, French fries,
              and tasty barbecue sauce.
            </p>
            <button
              data-aos="fade-right"
              data-aos-offset="300"
              data-aos-delay="300"
              data-aos-easing="ease-in-sine"
              className="btn"
              onClick={() =>
                handleRecipeClick({
                  title: "Vegetable Sizzler",
                  description:
                    "Sizzlers are a favorite with Indians, as they come with sizzler plates, thick steaks, rice, stir-fried vegetables, French fries, and tasty barbecue sauce.",
                  image: vegetableImage,
                })
              }
            >
              Get Recipe &#8594;
            </button>
          </div>
          {/*  <img
            src={vegetableImage} // Ensure the image path is correct
            alt="Vegetable Sizzler"
            className="highlight-image"
          /> */}
        </div>
      </section>

      {/* Popular Recipes */}
      <section className="popular-recipes">
        <h3 className="recipe-title">Popular Recipes</h3>
        <div className="recipe-list">
          {recipes.length > 0 ? (
            recipes.map((recipe, index) => (
              <div key={index} className="recipe-card">
                <img
                  data-aos="fade-left"
                  data-aos-offset="100"
                  src={recipe.image}
                  alt={recipe.title}
                  className="recipe-image"
                />
                <div data-aos="fade-right" className="recipe-info">
                  <div className="recipe_info-tittle">
                    <h3>{recipe.title}</h3>
                    <p className="rating-p">
                      {" "}
                      <span className="star-span">&#9733;</span> {recipe.rating}
                    </p>
                  </div>
                  <p className="duration-p">Duration: {recipe.duration}</p>
                  <p className="description-p">{recipe.description}</p>
                </div>
                <button
                  data-aos="fade-left"
                  data-aos-offset="100"
                  className="btn-"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleRecipeClick(recipe);
                  }}
                >
                  Get Recipe
                </button>
              </div>
            ))
          ) : (
            <p>No recipes found</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
