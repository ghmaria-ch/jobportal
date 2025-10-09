// // const express = require("express");

// // const { getprofile ,addprofile,editprofile,getallprofiles,updatestudentrating} = require("../controllers/studentController"); // Import signup logic
// // const router = express.Router();



// // router.get("/getprofile/:studentId",getprofile);
// // router.get("/getallprofiles",getallprofiles)
// // router.post("/addprofile",addprofile);
// // router.put("/editprofile/:studentId",editprofile);
// // router.put("/updatestudentrating/:studentId",updatestudentrating);
// // module.exports = router;


// const express = require("express");

// const { 
//     getprofile ,
//     addprofile,
//     editprofile,
//     getallprofiles,
//     updatestudentrating,
//     uploadCertificates // 📌 IMPORT NEW MIDDLEWARE
// } = require("../controllers/studentController"); 

// const router = express.Router();

// router.get("/getprofile/:studentId",getprofile);
// router.get("/getallprofiles",getallprofiles)
// router.post("/addprofile", uploadCertificates, addprofile); // 📌 APPLY MIDDLEWARE
// router.put("/editprofile/:studentId", uploadCertificates, editprofile); // 📌 APPLY MIDDLEWARE
// router.put("/updatestudentrating/:studentId",updatestudentrating);
// module.exports = router;


const express = require("express");

const { 
    getprofile ,
    addprofile,
    editprofile,
    getallprofiles,
    updatestudentrating,
    uploadCertificates // 📌 IMPORTED MIDDLEWARE
} = require("../controllers/studentController"); 

const router = express.Router();

router.get("/getprofile/:studentId",getprofile);
router.get("/getallprofiles",getallprofiles)
router.post("/addprofile", uploadCertificates, addprofile); // 📌 APPLIED
router.put("/editprofile/:studentId", uploadCertificates, editprofile); // 📌 APPLIED
router.put("/updatestudentrating/:studentId",updatestudentrating);
module.exports = router;