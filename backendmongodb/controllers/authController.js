const User = require("../models/users");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // 🛑 Check if user already exists with the same email and role
    const existingUser = await User.findOne({ email, role });

    if (existingUser) {
      return res.status(400).json({ message: `User already registered as ${role}.` });
    }

    // ✅ Create new user
    const newUser = new User({ name, email, password, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Database error", error: err });
  }
};

exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // 🔍 Check if user exists with matching email, password, and role
    const user = await User.findOne({ email, password, role });

    if (!user) {
      return res.status(401).json({ message: "Invalid email, password, or role" });
    }

    // 🔐 Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      "your_secret_key", // Change this to a strong secret and keep in .env
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Database error", error: err });
  }
};
