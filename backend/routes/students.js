// // routes/students.js
// import express from 'express';
// import { registerStudent } from '../controllers/studentsController.js';

// const router = express.Router();

// router.post('/register', registerStudent);

// export default router;
import express from 'express';
import { registerStudent, loginStudent ,getStudentProfile} from '../controllers/studentsController.js';

const router = express.Router();

router.post('/register', registerStudent);
router.post('/login', loginStudent);
router.get('/profile/:id', getStudentProfile);

export default router;
