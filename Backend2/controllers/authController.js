const db = require("../db"); 

exports.signup = (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // 🛑 First, check if the user already exists with the same role
    const checkQuery = "SELECT * FROM users WHERE email = ? AND role = ?";
    db.query(checkQuery, [email, role], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }

        // 🚨 If user already exists with this role, return an error
        if (results.length > 0) {
            return res.status(400).json({ message: `User already registered as ${role}.` });
        }

        // ✅ Insert user if no duplicate found
        const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
        db.query(query, [name, email, password, role], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Database error", error: err });
            }
            res.status(201).json({ message: "User registered successfully" });
        });
    });
};


const jwt = require("jsonwebtoken");


exports.login = (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists with the provided role
    const query = "SELECT * FROM users WHERE email = ? AND password = ? AND role = ?";
    db.query(query, [email, password, role], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: "Invalid email, password, or role" });
        }

        const user = results[0];

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            "your_secret_key",
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    });
};

