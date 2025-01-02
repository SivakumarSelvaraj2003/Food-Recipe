import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "./LoginForm.css"
import AOS from "aos";
import "aos/dist/aos.css"; // Import the CSS
import { useEffect } from "react"; // Import useEffect for initialization

const burgerImage = "/images/burger.png";

// Reusable Input Component
const InputField = ({ label, type, placeholder, value, onChange }) => (
  <div style={{ marginBottom: "10px" }}>
    <label
      style={{
        display: "block",
        fontSize: "18px",
        textAlign: "start",
        marginBottom:"5px",
        color:"black"
      }}
    >
      {label}
    </label>
    <input className='input'
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        marginBottom: "10px",
        padding: "10px",
        width: "350px",
        height:"20px",
        borderRadius: "5px",
        border: "1px solid #ccc",
      
      }}
    />
  </div>
);

// Reusable Button Component
const Button = ({ text, onClick }) => (
  <button
    onClick={onClick}
    style={{ padding: '10px', backgroundColor: 'orange', color: 'white', border: 'none', cursor: 'pointer',  width:'90%',height:"40px",fontSize:"18px"}}
  >
    {text}
  </button>
);
//login component
// Login Component
const Login = ({ onSwitchToRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");


  const navigate = useNavigate(); 
useEffect(() => {
  AOS.init({
    duration: 700, 
    easing: "ease-in-out", 
    once: true, 
  });
}, []);



  const handleLogin = async () => {
    setError(""); // Clear general error
    setEmailError(""); // Clear email-specific error

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          password,
        }
      );
      // Save the token for authenticated requests
      localStorage.setItem("token", response.data.token);
      alert("Login Successful!");
      navigate("/recipe"); 
    } catch (error) {
      setError(error.response?.data?.error || "Login failed!");
    }
  };

  return (
    <div
      style={{
        width: "420px",
        height: "500px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "0px ",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",                
      }}
      data-aos="flip-right"
    >
      <div style={{ color: "orange" }}>
        <img
          data-aos="fade-left"
          data-aos-duration="1000"
          src={burgerImage}
          alt="Burger"
          style={{
            width: "60px",
            height: "50px",
            marginTop: "10px",
            marginLeft: "80px",
          }} // Adjust size as needed
        />
        <h2 data-aos="fade-left" data-aos-duration="1000">
          Food Recipe
        </h2>
        <h5 data-aos="fade-left" data-aos-duration="1000">
          Sign in
        </h5>
      </div>
      <InputField
        label="Email"
        type="email"
        placeholder="example@mail.com"
        value={username}
        onChange={(value) => {
          setUsername(value);
          setEmailError(""); // Clear email error on input change
        }}
        data-aos="fade-left"
        data-aos-duration="1000"
      />
      {emailError && (
        <div className="error-message" style={{ color: "red" }}>
          {emailError}
        </div>
      )}
      <InputField
        label="Password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={setPassword}
      />
      {error && (
        <div className="error-message" style={{ color: "red" }}>
          {error}
        </div>
      )}
      <Button text="Sign in" onClick={handleLogin} />
      <p data-aos="fade-left" data-aos-duration="1000">
        Don't have an account?{" "}
        <span
          style={{ color: "orange", cursor: "pointer" }}
          onClick={onSwitchToRegister}
        >
          Sign up
        </span>
      </p>
    </div>
  );
};

// Registration Form Component
const RegistrationForm = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleRegister = async () => {
    setError(""); // Clear general error
    setEmailError(""); // Clear email-specific error

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    // Password matching validation
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username: email, // Assuming email acts as the username
        password,
      });
      alert("Registration Successful! Please log in.");
      onSwitchToLogin(); // Switch to login form
    } catch (error) {
      setError(error.response?.data?.error || "Registration failed!");
    }
  };

  return (
    <div
      style={{
        width: "420px",
        height: "600px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "0px",
        paddingTop: "0px",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
      }}
      data-aos="flip-left"
    >
      <div style={{ color: "orange" }}>
        <img
          data-aos="fade-right"
          data-aos-duration="1000"
          src={burgerImage}
          alt="Burger"
          style={{
            width: "60px",
            height: "50px",
            marginTop: "10px",
            marginLeft: "80px",
          }} // Adjust size as needed
        />
        <h2 data-aos="fade-right" data-aos-duration="1000">
          Food Recipe
        </h2>
        <h5 data-aos="fade-right" data-aos-duration="1000">
          Sign up
        </h5>
      </div>
      <InputField
        label="Email"
        type="email"
        placeholder="example@mail.com"
        value={email}
        onChange={(value) => {
          setEmail(value);
          setEmailError(""); // Clear email error on input change
        }}
      />
      {emailError && (
        <div className="error-message" style={{ color: "red" }}>
          {emailError}
        </div>
      )}
      <InputField
        label="Password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={setPassword}
      />
      <InputField
        label="Confirm Password"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={setConfirmPassword}
      />
      {error && (
        <div className="error-message" style={{ color: "red" }}>
          {error}
        </div>
      )}
      <Button text="Sign up" onClick={handleRegister} />

      <p data-aos="fade-right" data-aos-duration="1000" data-aos-offset="100">
        Already have an account?{" "}
        <span
          style={{ color: "orange", cursor: "pointer" }}
          onClick={onSwitchToLogin}
        >
          Sign in
        </span>
      </p>
    </div>
  );
};



// Main Component
const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="login-page" style={{ padding: '20px',}}>
      {isLogin ? (
        <Login onSwitchToRegister={() => setIsLogin(false)} />
      ) : (
        <RegistrationForm onSwitchToLogin={() => setIsLogin(true)} />
      )}
    </div>
  );
};



export default LoginForm;
