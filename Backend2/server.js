// const express = require("express");
// const cors = require("cors");
// const authRoutes = require("./routes/authRoutes"); // Import signup routes
// const studentRoutes = require("./routes/studentRoutes"); 
// const jobRoutes = require("./routes/jobRoutes"); 
// const applicationRoutes = require("./routes/applicationRoutes")  // Import signup routes
// const db = require("./db"); // Import database connection

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Use Auth Routes
// app.use("/auth", authRoutes);
// app.use("/student", studentRoutes);
// app.use("/job", jobRoutes); 
// app.use("/application",applicationRoutes);//

// // Start the Server
// app.listen(5000, () => {
//     console.log("Server running at http://localhost:5000");
// });


const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes"); 
const studentRoutes = require("./routes/studentRoutes"); 
const jobRoutes = require("./routes/jobRoutes"); 
const applicationRoutes = require("./routes/applicationRoutes") 
const db = require("./db"); 
const path = require("path"); // 📌 NEW IMPORT

const app = express();
app.use(express.json());
app.use(cors());

// 📌 NEW: Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

// Use Auth Routes
app.use("/auth", authRoutes);
// ... (rest of the app.use lines remain the same)