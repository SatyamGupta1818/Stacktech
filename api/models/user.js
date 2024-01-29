
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    verified:{
        type:Boolean,
        default:false,
    },
    verificationToken:String,
    profileImage:String,
    userDescription:{
        type:String,
        default:null,
    },
    connections:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    connectionRequest:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    sendConnnectionRequest:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    post:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const User = mongoose.model("User" ,userSchema);
module.exports = User;