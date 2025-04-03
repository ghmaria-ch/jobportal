const express = require("express");
const { apply,getappliedjobs,getappliedall,getapplicantsforrecruiterjobs } = require("../controllers/applicationController"); // Import signup logic
const router = express.Router();

router.post('/apply', apply);
router.get('/getappliedjobs/:studentId', getappliedjobs);
router.get('/getappliedall', getappliedall);
router.get('/getapplicantsforrecruiterjobs', getapplicantsforrecruiterjobs);
module.exports = router;
