
 import React from "react";
import LoginForm from "./Components/assets/LoginForm/LoginForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Recipe from "./Components/assets/Recipe/Recipe" 
import RecipeDetails from "./Components/assets/RecipeDetails/RecipeDetails"
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/recipedetails" element={<RecipeDetails />} />
        {/* Define the target route */}
      </Routes>
    </Router>  
  );           
};
export default App;