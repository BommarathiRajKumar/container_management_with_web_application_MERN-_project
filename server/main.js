const express = require("express");
const app = express();
const port = 9000;
const mongoose = require("mongoose");
const cors = require("cors");
//importing user_details Collection which is arranged with proper schema from dbSchema.js file
const userDetailsCollection = require("./userDetailsCollectionWithShema")

//Connecting to MongoDataBase (specific databBase) using Mongoose.
//it will take one argumet that is db connection string which will help us to connet to database
//we can also send an second arugment for deprication warnings.
mongoose.connect( "mongodb://127.0.0.1:27017/users").then(
    () => console.log("DB Connected Successfully")
)


app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:3000'
}))


//Routers
//we will create routers for multiple methods like get request, post request,put request,delete request....etc
//every method will take two arguments firtst argument is URL path and second one will fun.
//again secon argument fun will take two arguments one argument is request is for take input from browser and second one is responce is for send back the response to the browser. 
//async will handle the delay time when we insert the data into the the DB.

app.post("/userDetailsSaveToDb", async(req, res) =>{
    const var2_id = req.body.userDetails.mobileNumber;
    const var2email = req.body.userDetails.email;
    const var2profileName = req.body.userDetails.profileName;
    const var2password = req.body.userDetails.password;
    try{
        const saveToDb =new userDetailsCollection({
            _id: var2_id,
            email: var2email,
            profileName: var2profileName,
            password: var2password
            
        });
        await saveToDb.save();
        return res.json(await userDetailsCollection.find() )
    

    }catch(err){
        console.log(err)
    }
})
app.get("/", (rep,res) => res.sendFile(__dirname +"/index.html"))

app.get("/getDbData", async function(req, res){
    return res.json(await userDetailsCollection.find() )
})



//Starting server by assining the particular port number.
//listen wil take two arguments one is port num and fun.
app.listen(port, () => console.log(`your sever start at ${port}`) )


