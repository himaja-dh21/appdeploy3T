const express = require("express");
const router = express.Router();
const student = require("../schema.js");
const upload = require("../middleware.js");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");

router.post("/login", upload.none(), async(req,res)=>{
    console.log(req.body)
    let userArr = await student.find().and([{email:req.body.email}])

    let token = jwt.sign({email:req.body.email, password:req.body.password},"mykey")

    let isValidPassword = await bcrypt.compare(req.body.password, userArr[0].password);

    if (userArr.length > 0) {
        if (isValidPassword === true) {
            let dataToSend = {
                firstName: userArr[0].firstName,
                lastName: userArr[0].lastName,
                email: userArr[0].email,
                mobileNo: userArr[0].mobileNo,
                profilePic: userArr[0].profilePic,
                token: token
            }
            res.json({status:"Success", msg: "Login Successful", data:dataToSend})
        } else {
            res.json({status:"Failed", msg: "Incorrect Password"})
        }
    } else {
        res.json({status:"Failed", msg: "User doesn't exist"})
    }
})

module.exports = router;
