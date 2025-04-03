const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes"); // Import signup routes
const studentRoutes = require("./routes/studentRoutes"); 
const jobRoutes = require("./routes/jobRoutes"); 
const applicationRoutes = require("./routes/applicationRoutes")  // Import signup routes
const db = require("./db"); // Import database connection

const app = express();
app.use(express.json());
app.use(cors());

// Use Auth Routes
app.use("/auth", authRoutes);
app.use("/student", studentRoutes);
app.use("/job", jobRoutes); 
app.use("/application",applicationRoutes);//

// Start the Server
app.listen(5000, () => {
    console.log("Server running at http://localhost:5000");
});
