/* eslint-disable prettier/prettier */
import * as mongoose from "mongoose";
export const LoginSchema=new mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,required:true}
})
export interface Login{
    id:string;
    email:string;
    password:string;
    role:string
}