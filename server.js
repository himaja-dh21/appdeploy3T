let mongoose = require("mongoose");
let express = require("express");
let cors = require("cors");
let jwt = require("jsonwebtoken");
let student = require("./schema.js");
let dotenv = require("dotenv");
dotenv.config();


let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use('/profilePics', express.static('profilePics'));
const upload = require("./middleware.js");

app.use("/", require("./routes/LoginRouter"));
app.use("/", require("./routes/SignupRouter"));
app.use("/", require("./routes/EditRouter"));
app.use("/", require("./routes/DeleteRouter"));

app.post("/validateToken", upload.none(), async(req,res)=>{
    console.log(req.body)
    let decryptedCredentials = jwt.verify(req.body.token,"mykey")
    console.log(decryptedCredentials)
    let userArr = await student.find().and([{email:decryptedCredentials.email}])

    if (userArr.length > 0) {
        if (userArr[0].password === decryptedCredentials.password) {
            let dataToSend = {
                firstName: userArr[0].firstName,
                lastName: userArr[0].lastName,
                email: userArr[0].email,
                mobileNo: userArr[0].mobileNo,
                profilePic: userArr[0].profilePic
            }
            res.json({status:"Success", msg: "Login Successful", data:dataToSend})
        } else {
            res.json({status:"Failed", msg: "Incorrect Password"})
        }
    } else {
        res.json({status:"Failed", msg: "User doesn't exist"})
    }
})

const path = require("path");
app.use(express.static(path.join(__dirname, './client/build')));

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(process.env.PORT, ()=>{
    console.log(`Listening to Port ${process.env.PORT} successfully!!`)
})

let connectedToMDB = async ()=>{
    try {
        await mongoose.connect(process.env.MDBURL)
        console.log("Connected to MDB Successfully!!")
        console.log("Data Inserted Successfully");
    } catch (error) {
        console.log("Unable to connect to MDB");
        console.log("Unable to insert data into MDB");
    }
}

connectedToMDB();