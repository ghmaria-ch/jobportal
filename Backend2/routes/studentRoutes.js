const express = require("express");

const { getprofile ,addprofile,editprofile} = require("../controllers/studentController"); // Import signup logic
const router = express.Router();



router.get("/getprofile/:studentId",getprofile);
router.post("/addprofile",addprofile);
router.put("/editprofile/:studentId",editprofile);

module.exports = router;
