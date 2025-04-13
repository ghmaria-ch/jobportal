// const express =require ("express")
// const mongoose =require ("mongoose")
// const cors =require ("cors")
// require('dotenv').config()

// const app= express()
// app.use (cors())
// app.use(express.json())

// mongoose.connect(process.env.MONGO_URI)
// .then(()=>{
//     app.listen(5000, () => {
//         console.log("connected to db and server running at http://localhost:5000");
//       });
// })
// .catch((error)=>
// {
//     console.log(error)
// })


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
const authRoutes = require("./routes/authRoutes");

// Import the User model
const User = require('./models/users');
const studentRoutes = require("./routes/studentRoutes");  // Ensure this path is correct

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/student", studentRoutes);


// MongoDB connection setup
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => {
      console.log("Connected to DB and server running at http://localhost:5000");
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error);
  });

// Example: Create a user via a POST route

