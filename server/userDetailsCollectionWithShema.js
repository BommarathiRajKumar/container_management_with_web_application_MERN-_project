const mongoose = require("mongoose");

const mainSchema = mongoose.Schema({
    _id:{
        type: Number,
        reuired: true
    },
    email:{
    },
    profileName:{
        type: String,
        required: true

    },
    password:{
    },
    profileCreatedOn:{
        type: Date,
        default: Date.now
    }
    
})


const user_details = mongoose.model("user_details", mainSchema);

module.exports = user_details;


    /*email:{ 
        type: String, 
        trim: true, 
        lowercase: true, 
        unique: true, 
        validate:{
            validator: function (v) { 
                return /^w+ ([.-]?w+)*@w+ ([.-]?w+)* (.w {2,3})+$/.test (v); 
            },
            message: "Please enter a valid email" 
        }, 
        required: [true, "Email required"] 
    },*/