const express = require('express');
const {postajob,getrecruiterjobs, deletejob,getjobs }= require ("../controllers/jobController")
const router = express.Router();

router.post('/postajob', postajob);
router.get('/getrecruiterjobs/:recruiterId', getrecruiterjobs);
router.delete('/delete/:jobId',deletejob)
router.get('/getjobs',getjobs)
 // POST API for posting a job

module.exports = router;
