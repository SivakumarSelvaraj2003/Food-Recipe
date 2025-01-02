import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RecipeDetails.css";
//for AOS animation
import AOS from "aos";
import "aos/dist/aos.css"; 
const burgerImage = "/images/burger.png"; //import burger image
//import icons
import { FaSearch } from "react-icons/fa";
import { FaStar,} from "react-icons/fa"; 


//recipe details function
const RecipeDetails = () => {
  const ingredients = [
    { name: "Chicken", quantity: "1 KG" },
    { name: "Rice", quantity: "1 KG" },
    { name: "Large red onions", quantity: "3" },
    { name: "Peanut oil for frying", quantity: "200ml" },
    { name: "Chilli powder", quantity: "1 tsp" },
    { name: "Ginger garlic paste", quantity: "2 tsp" },
    { name: "Ground turmeric", quantity: "1/2 tsp" },
    { name: "Lemon", quantity: "1" },
    { name: "Green chillies", quantity: "3" },
    { name: "Cinnamon sticks", quantity: "1" },
    { name: "Cumin seeds", quantity: "1 tsp" },
    { name: "Cloves", quantity: "6" },
    { name: "Coriander & Mint", quantity: "Each 1 bunch" },
    { name: "Salt", quantity: "For taste" },
  ];

  //for accordion
  const [openStep, setOpenStep] = useState(null);

  const toggleStep = (index) => {
    setOpenStep(openStep === index ? null : index);
  };

  //for speach instruction
  const speakInstruction = (instruction) => {
    const utterance = new SpeechSynthesisUtterance(instruction);
    speechSynthesis.speak(utterance);
  };


  //directions function
  const directions = [
    {
      step: 1,
      instruction:
        "Start by making the crispy onions by heating up the oil in a saucepan over medium-high heat and frying the sliced onions in batches until golden brown. Next, marinate your chicken by adding the chicken, 1/3 of the crispy onions, yogurt, chilli powder, turmeric, garam masala, ginger, garlic, lemon juice, cinnamon stick, cardamom pods, green chilli sliced thin, cumin seeds, cloves, chopped mint and coriander, and a tsp of salt in a large pot. Mix well and marinate for 4-24 hours.",
    },
    { step: 2, instruction: "Prepare the rice by washing and soaking it." },
    { step: 3, instruction: "Layer the marinated chicken and cooked rice." },
    { step: 4, instruction: "Cook the biryani over low heat for 40 minutes." },
  ];

  //for comments
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
    rating: "5",
  });

  useEffect(() => {
    fetchComments();
  }, []);

  //for aos animation
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  //fetch comments
  const fetchComments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/comments");
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  //for comments input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // for comments star ratings
  const handleStarClick = (rating) => {
    setFormData({ ...formData, rating });
  };

  //for comments submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/comments",
        formData
      );
      setComments([response.data, ...comments]);
      setFormData({ name: "", email: "", comment: "", rating: "5" });
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  //html
  return (
    <section className="recipe-details">
      {/* Header */}
      <div className="recipe-header">
        <div className="recipe_details-header">
          <h1 className="recipe_logo">
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
          <div className="recipe_searchbar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for recipes..."
              className="search-input"
            />
          </div>
        </div>
        {/*   <img
          src="https://via.placeholder.com/800x400"
          alt="Chicken Biryani"
          className="recipe-image"
        /> */}
        <div className="recipe-infos">
          <h2
            data-aos="fade-right"
            className="recipe-infos-header"
            style={{ color: "orange", fontSize: "4rem", fontWeight: "bolder" }}
          >
            Chicken Biryani
          </h2>
          <div data-aos="fade-up" className="recipe-icons">
            <p style={{ color: "white", fontWeight: "bolder" }}>
              {" "}
              <span> &#x1F552;</span>{" "}
              <span style={{ color: "white" }}>1h 12m</span>
            </p>
            <p style={{ color: "white", fontWeight: "bolder" }}>
              {" "}
              <span>👨‍🍳</span>
              <span style={{ color: "white" }}> Bharath</span>
            </p>
            <p style={{ color: "white", fontWeight: "bolder" }}>
              {" "}
              <span> &#127831;</span>{" "}
              <span style={{ color: "white" }}>Non-veg</span>
            </p>
            <p
              style={{
                color: "white",
                fontWeight: "bolder",
                marginRight: "50px",
              }}
            >
              <span style={{ fontSize: "24px", fontWeight: "bolder" }}>
                {" "}
                &#9733;
              </span>
              4.7
            </p>
          </div>
        </div>
      </div>
      <div className="recipe-content">
        {/* Ingredients list */}
        <div
          data-aos="fade-right"
          data-aos-offset="300"
          className="ingredients"
        >
          <h3>Ingredients</h3>
          <div className="ingredients-list">
            <ul>
              {ingredients.map((item, index) => (
                <li key={index}>{item.name}</li>
              ))}
            </ul>
            <ul className="ingredients-quantity">
              {ingredients.map((item, index) => (
                <li key={index}>{item.quantity}</li>
              ))}
            </ul>
          </div>
        </div>
        <div data-aos="fade-left" data-aos-offset="300" className="directions">
          {/* Directions */}
          <h3>Directions</h3>
          {directions.map((step, index) => (
            <div key={index} className="direction-step">
              <h4
                onClick={() => toggleStep(index)}
                style={{
                  cursor: "pointer",
                  background: "#f4f4f4",
                  padding: "10px",
                  borderBottom: "1px solid #ddd",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px",
                }}
              >
                <span style={{ color: "black" }}>{`Step ${step.step}`}</span>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ color: "black" }}>
                    {openStep === index ? "▲" : "▼"}
                  </span>
                  <button
                    onClick={() => speakInstruction(step.instruction)}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                  >
                    🔊
                  </button>
                </div>
              </h4>
              {openStep === index && (
                <p
                  style={{
                    padding: "10px",
                    background: "#fff",
                  }}
                >
                  {step.instruction}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      <section className="comments">
        {/* Comments Form */}
        <h3 style={{ color: "orange", fontFamily: "cursive" }}>
          Cooked this? Comment and rate the recipe
        </h3>
        <div data-aos="fade-right" className="comments-section">
          <form className="comment-form" onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <label>
              Your Rating:
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    onClick={() => handleStarClick(star)}
                    color={formData.rating >= star ? "orange" : "gray"}
                    style={{ cursor: "pointer", fontSize: "25px" }}
                  />
                ))}
              </div>
            </label>
            <label>Your Comments</label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              required
              style={{
                height: "150px",
                padding: "10px",
                borderRadius: "4px",
              }}
            />
            <button
              type="submit"
              style={{ width: "100%", backgroundColor: "orange" }}
            >
              Submit Comment
            </button>
          </form>
          <div data-aos="fade-left" className="comment-list">
              {/* Comments */}
            <h3
              style={{
                marginTop: "0px",
                color: "orange",
                fontFamily: "cursive",
              }}
            >
              Comments
            </h3>
            {comments.map((comment, index) => (
              <div key={index} className="comment-item">
                <p>
                  <span
                    style={{
                      backgroundColor: "#f9f9f9",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    {" "}
                    <span
                      style={{
                        color: "orange",
                        fontSize: "18px",
                        marginRight: "5px",
                      }}
                    >
                      &#9733;
                    </span>
                    {comment.rating}{" "}
                  </span>{" "}
                  <strong style={{ marginLeft: "10px" }}>{comment.name}</strong>
                </p>
                <p>{comment.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default RecipeDetails;
