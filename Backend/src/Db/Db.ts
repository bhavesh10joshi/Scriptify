import { Schema, model } from "mongoose";
import ObjectId = Schema.Types.ObjectId;

// Database Schema for storing the User related info
const UserSchema = new Schema({
    name : {type : String , required : true} , 
    email : {type : String , required : true , unique : true} , 
    password : {type : String , required : true}
});

// Database Schema for the storing the product related information
const ProductSchema = new Schema({
    userId : {type : ObjectId , required : true , unique : true} , 
    name : {type : String , required : true} , 
    category : {type : String , required : true} , 
    brandName : {type : String , required : true} , 
    keyFeatures : {type : String , required : true} , 
    targetAudience : {type : String , required : true} , 
    // Ai generated Content info
    productDescription : {type : String } , 
    shortDescription : {type : String } ,
    keySellingPoints : {type : String } ,
    seoKeywords : {type : String } , 
    productTagline : { type : String } 
});   

// Exporting the Database Schema models
export const UserModel = model("User" , UserSchema);
export const ProductModel = model("Product" , ProductSchema);  
