const express = require("express");
const router = express.Router();
const student = require("../schema.js");
const upload = require("../middleware.js");

router.delete("/deleteProfile", upload.none(),async(req,res)=>{
    let delResult = await student.deleteMany({email:req.body.email});
    if(delResult.deletedCount > 0){
        res.json({status:"Success", msg: "Profile Deleted Successfully"});
    }   else {  
        res.json({status:"Failed", msg: "Profile Deletion Failed"});
    }
})

module.exports = router;
