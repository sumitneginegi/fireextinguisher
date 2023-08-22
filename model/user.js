const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const objectId = mongoose.Types.ObjectId;

const UserSchema = new mongoose.Schema(
    {
        name:{
            type:String
        },
        phone: {
            type: String,
        },
        email:{
            type:String
        },
        password:{
            type:String
        },
        otp: {
            type: String,
        },
        otpExpiration:{
            type:String
        },
        accountVerification:{
            type:String
        },
        
        status:{
            type:String,
            // enum:["hold","pending"]
            default:"pending"
        },
        /////////////////////////////////////////////////////////
        lati: {
            type: String
        },
        longi: {
            type: String
        },
       
        userType: {
            type: String,
            enum: ["seller", "consultant","admin","user"],
            default: "consultant"
        },
        
    },
    {
        timestamps: true,
    }
)

const UserModel = mongoose.model("User", UserSchema)
module.exports = UserModel
