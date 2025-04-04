
const express = require("express");
const cors = require("cors");
const connectDB = require("./db"); // MongoDB connection file

const app = express();
app.use(express.json());
app.use(cors());

// 🔌 Connect to MongoDB
connectDB();

// 👇 Define your routes here (e.g., jobs, applications, auth, etc.)
// Example: app.use('/api/jobs', require('./routes/jobs'));

// 🚀 Start the server
app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
