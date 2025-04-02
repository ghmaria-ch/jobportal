import express from 'express';
import multer from 'multer';
import db from '../db.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: './uploads/certificates/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({ storage });

router.put('/:studentId', upload.array('certificates', 5), async (req, res) => {
    try {
        const { studentId } = req.params;
        const { name, email, degree, university, location, bio, skills } = req.body;
        const skillData = JSON.parse(skills);
        
        await db.execute(`UPDATE students SET name=?, email=? WHERE id=?`, [name, email, studentId]);
        
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Invalid request', error: error.message });
    }
});

export default router;
