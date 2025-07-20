import mongoose from "mongoose";
import { User } from "../../../domain/entities/User";

const userSchema= new mongoose.Schema<User>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        required:false,
        default :''
    },
    phone:{
        type:String,
        required:false,
        default:""
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user',
        required:true
    },
},{timestamps:true})


export default mongoose.model('User',userSchema);