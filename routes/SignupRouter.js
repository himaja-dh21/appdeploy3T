const express = require("express");
const router = express.Router();
const student = require("../schema.js");
const upload = require("../middleware.js");
let bcrypt = require("bcrypt");

router.post("/signup",upload.single("profilePic"), async (req,res)=>{
    console.log(req.file);
    console.log(req.body)

    let hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {
        let user = new student({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:hashedPassword,
        mobileNo:req.body.mobileNo,
        profilePic:req.file.path
    });
    await student.insertMany([user]);
    res.json({status:"Success", msg: "Account Created Successfully"});
    } catch (err) {
        res.json({status:"Failed", msg: "Account Creation Failed"});  
    }
})

module.exports = router;
