import {Schema, model} from "mongoose";

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    middleName:{
        type:String,
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true
    },
    addressLine1:{
        type:String,
        required:true
    },
    addressLine2:{
        type:String,
    },
    city:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    zipCode:{
        type:String,
        required:true
    },
    aadhaarNumber:{
        type:String,
        required:true,
        unique:true
    },
    aadhaarPhoto:{
        type:String,
    },
    profileImage:{
        type:String,

    },
    password:{
        type:String,
        required:true
    }

}, {timestamps:true});


const User = model('User', userSchema);

export default User;
