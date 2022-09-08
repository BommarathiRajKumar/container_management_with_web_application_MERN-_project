const express = require("express");
const port = 9000;
const mongoose = require("mongoose");
const TaskSchema = require("./dbShema")

const app = express();

//it will take one argumet that is db connection string which will help us to connet to database
//we can also send an second arugment for deprication warning.
mongoose.connect('mongodb://127.0.0.1:27017').then(
    console.log("Db connected successfully")
)
app.use(express.urlencoded({extended: true}));
app.use(express.json());



//Routers
//we will create routers for multiple methods like get request, post request,put request,delete request....etc
//every method will take two arguments firtst argument is URL path and second one will fun.
//again secon argument fun will take two arguments one argument is request is for take input from browser and second one is responce is for send back the response to the browser. 
//async will handle the delay time when we insert the data into the the DB.
app.post("/addtask",async (req, res) => {
    const todo = req.body.todo;
    try{
        const newData = new TaskSchema({
            todo: todo
        })
        await newData.save();
        return res.json(await TaskSchema.find())


    
    }catch(err){
        console.log(err)
    }
})

//listen wil take two arguments one is port num and fun.
app.listen(port, () => console.log(`server started at port num ${port}`))

















