// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await 
    mongoose.connect("")

      
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1); // Exit app if connection fails
  }
};

module.exports = connectDB;
