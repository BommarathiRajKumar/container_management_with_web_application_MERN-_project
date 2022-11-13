const express = require("express");
const app = express();
const port = 9000;
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const middleware = require("./middleware");
//importing user_details Collection which is arranged with proper schema from dbSchema.js file
const user_details = require("./userDetailsCollectionWithShema")

//Connecting to MongoDataBase (specific databBase) using Mongoose.
//it will take one argumet that is db connection string which will help us to connet to database
//we can also send an second arugment for deprication warnings.
mongoose.connect("mongodb://127.0.0.1:27017/users").then(
    () => console.log("DB Connected Successfully")
)


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));


//Routers
//we will create routers for multiple methods like get request, post request,put request,delete request....etc
//every method will take two arguments firtst argument is URL path and second one will fun.
//again secon argument fun will take two arguments one argument is request is for take input from browser and second one is responce is for send back the response to the browser. 
//async will handle the delay time when we insert the data into the the DB.
app.post("/signup", async (req, resp) => {
    try{
        user_details.findOne({_id: req.body.userDetails.mobileNumber}, async(err, userNumber) => {
            if(err){
                console.log(err)
                return resp.status(500).send("server error");
            }else if(userNumber == null){
                user_details.findOne({email: req.body.userDetails.email}, async (err, userEmail) => {
                    if(err){
                        console.log(err)
                    }else if(userEmail == null){
                        var otp = 123
                        return resp.status(200).send("userCreated");
                    }else{
                        return resp.status(401).send("providedEmailExist");
                    }
                })
            }else{
                return resp.status(400).send("mobileNumberExist");
            }
        })
    }catch(err){
        console.log(err)
        return resp.status(500).send("server error")
    }
})


app.post("/otpValidate", async (req, resp) =>{
    try{
        if(req.body.userDetails.otp === "123"){
            var newUser_Details = new user_details({
                _id:         req.body.userDetails.mobileNumber,
                email:       req.body.userDetails.email,
                profileName: req.body.userDetails.profileName,
                password:    req.body.userDetails.password
            });
            console.log("user Created")
            await newUser_Details.save();
            return resp.status(200).send("userCreated");
        }else{
            return resp.status(400).send("invalidOtp");
        }

    }catch(err){
        console.log(err)
        return resp.status(500).send("server error")
    }

})

app.post("/login", async(req, resp) => {
    try{
        const mobileNumber = req.body.credentials.mobileNumber
        const password = req.body.credentials.password
        //const {mobileNumber, password} = req.body;
        user_details.findOne({_id: mobileNumber}, async (err, userDetails) =>{
            if(err){
                console.log(err)
                return resp.status(500).send("server error")
            }else if(userDetails == null || userDetails.password !== password){
                return resp.status(401).send("InvalidCredentails")
            }else if(userDetails.password == password){
                let payload ={
                    user:{
                        id: userDetails._id
                    }
                }
                jwt.sign(payload, 'jwtSecurtyKey', {expiresIn:30000},
                (err, token) =>{
                    if(err) throw err;
                    return resp.status(200).json({token})
                });
            }
        });
    }catch(err){
        console.log(err);
        return resp.status(500).send("server error")

    } 
})

app.get("/profile", middleware, async(req, resp) => {
    try{
        user_details.findById(req.user.id, async (err, userDetails) =>{
            if(err){
                console.log(err);
                return resp.status(500).send("server error")
            }else if(userDetails == null){
                return resp.status(400).send("user not found")
            }else{
                userDetails.password = ""
                resp.json(userDetails)
            }
            
        })
    }catch(err){
        console.log(err);
        return resp.status(500).send("Invalid token or token expired")

    }
})

/*
app.route("/user_details/:_id")
.get((req, resp) => {
    user_details.findOne({_id: req.params._id}, (err, userDetails) =>{
        if(err){
            resp.send("user not found");
        }else{
            resp.send(userDetails);        
        }
    }) 
})
.patch((req, resp) => {
    user_details.updateOne({_id: req.params._id} , {profileName: req.body.newName},(err) => {
        if(err){
            console.log(err)
            resp.send(err)
        }else{
            resp.send("Patched")
        }
    })
})
*/
//Starting server by assining the particular port number.
//listen wil take two arguments one is port num and fun.
app.listen(port, () => console.log(`your sever start at ${port}`) )