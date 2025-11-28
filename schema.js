const mongoose = require("mongoose");

let studentSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    mobileNo:String,
    profilePic:String
})

let student = new mongoose.model("student",studentSchema,"StudentData");

module.exports = student;
