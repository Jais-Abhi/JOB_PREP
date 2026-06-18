import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app = express();


const connectToDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Database")
    }
    catch(err){
        console.log(err.MONGO_URI)
    }
}

export default connectToDB;