//import express
const express = require("express");
//import jwt
const jwt = require("jsonwebtoken");
//import  bcrypt
const bcrypt = require("bcryptjs");
//import user from model
const User = require("../models/User");
//create new router
const router = express.Router();

// register route
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: "User registration failed" });
  }
});

// login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, "your_secret_key", {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
