// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import studentsRoutes from './routes/students.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Register student route
app.use('/api/students', studentsRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
