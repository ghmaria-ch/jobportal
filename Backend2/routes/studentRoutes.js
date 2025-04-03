const express = require("express");

const { getprofile ,addprofile,editprofile,getallprofiles,updatestudentrating} = require("../controllers/studentController"); // Import signup logic
const router = express.Router();



router.get("/getprofile/:studentId",getprofile);
router.get("/getallprofiles",getallprofiles)
router.post("/addprofile",addprofile);
router.put("/editprofile/:studentId",editprofile);
router.put("/updatestudentrating/:studentId",updatestudentrating);
module.exports = router;
