import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import studentsRoutes from './routes/students.js';
import editRouter from './controllers/editprofile.js'; // Ensure correct import

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware (Ensure order)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Allows parsing form-data

// Serve uploaded files (important for viewing certificates)
app.use('/uploads', express.static('uploads'));

// Register routes
app.use('/api/students', studentsRoutes);
app.use('/uprofile', editRouter); // Ensure correct route

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
