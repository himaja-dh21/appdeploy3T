const express = require("express");
const router = express.Router();
const student = require("../schema.js");
const upload = require("../middleware.js");

router.patch("/updateProfile",upload.single("profilePic"), async (req,res)=>{
    console.log(req.body)
    try {
        if(req.body.firstName &&req.body.firstName.trim().length>0){
            await student.updateMany({email:req.body.email},{firstName:req.body.firstName.trim()});
        }
        if(req.body.lastName.trim().length>0){
            await student.updateMany({email:req.body.email},{lastName:req.body.lastName});
        }
        if(req.body.password.trim().length>0){
            await student.updateMany({email:req.body.email},{password:req.body.password});
        }
        if(req.body.mobileNo.trim().length>0){
            await student.updateMany({email:req.body.email},{mobileNo:req.body.mobileNo});
        }
        if(req.file){
            await student.updateMany({email:req.body.email},{profilePic:req.file.path});
        }
        res.json({status:"Success", msg: "Profile Updated Successfully"});
    } catch (error) {
        res.json({status:"Failed", msg: "Profile Updation Failed"});
    }
})

module.exports = router;
