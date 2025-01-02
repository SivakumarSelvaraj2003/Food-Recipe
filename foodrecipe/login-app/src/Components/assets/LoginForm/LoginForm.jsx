import React, { useState } from 'react';
import axios from "axios"; 
import { useNavigate } from "react-router-dom"; //for navigation
import "./LoginForm.css"
//import AOS animation library
import AOS from "aos";
import "aos/dist/aos.css"; 
import { useEffect } from "react"; 


//import burger image
const burgerImage = "/images/burger.png";

// input box
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

// button
const Button = ({ text, onClick }) => (
  <button
    onClick={onClick}
    style={{ padding: '10px', backgroundColor: 'orange', color: 'white', border: 'none', cursor: 'pointer',  width:'90%',height:"40px",fontSize:"18px"}}
  >
    {text}
  </button>
);

//login component
const Login = ({ onSwitchToRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

   //navigation function
  const navigate = useNavigate(); 

  //for AOS animation
useEffect(() => {
  AOS.init({
    duration: 700, 
    easing: "ease-in-out", 
    once: true, 
  });
}, []);


  //login error
  const handleLogin = async () => {
    setError(""); 
    setEmailError(""); 

    //for  email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
 //http requests from axios
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          password,
        }
      );

      // authentication token save
      localStorage.setItem("token", response.data.token);
      alert(" 🍽️  Welcome to Recipe Explorer! Let’s get cooking!");
      navigate("/recipe"); // recipe navigation
    } catch (error) {
      setError(error.response?.data?.error || "Login failed!");
    }
  };

  //html function
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
      data-aos="flip-right" //for aos animation
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
          }} 
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
          setEmailError(""); 
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

// registration form
const RegistrationForm = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  //registration errors
  const handleRegister = async () => {
    setError("");
    setEmailError("");

    // for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    // password match validation
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    //http requests from axios
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username: email, // Assuming email acts as the username
        password,
      });
      alert("🎉 Registration Successful! Log in to start cooking!");
      onSwitchToLogin();
    } catch (error) {
      setError(error.response?.data?.error || "Registration failed!");
    }
  };
//html for registration form
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
          }} 
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
          setEmailError(""); 
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



// main component
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
