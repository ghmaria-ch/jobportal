const express = require("express");
const { signup,login } = require("../controllers/authController"); // Import signup logic
const router = express.Router();

router.post("/signup", signup); // Attach signup route
router.post("/login", login); // Attach signup route


module.exports = router;
