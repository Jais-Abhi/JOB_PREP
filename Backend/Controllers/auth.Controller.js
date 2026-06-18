import express from "express";
import User from "../Models/user.model";

/**
 * @desc Controller for user register takes email, password and creates a new user in the database
 * @access Public
 */
const registerController = async(req,res)=>{
    const {name,email,password} = req.body;
    const isUserExist = User.findOne({email : email});
    if(isUserExist){
        return res.status(400).json({message : "User already exists with this email"});
    }
    const hashedPassword = await User.hashPassword(password);
    const user = await User.create({
        name : name,
        email : email,
        password : hashedPassword
    });

    return res.status(200).json(user);

}

/**
 * @desc Controller for user login takes email, password and returns a token if the user is authenticated
 * @access Public
 */
const loginController = async(req,res)=>{
    const {email,password} = req.body;
    const user = User.findOne({email:email});
    if(!user){
        return res.status(401).json({message : "User not exists with this email"});
    }
    if(!user.validatePassword(password)){
        return res.status(401).json({message : "Invalid credentails ! try again"});
    }
    const token = await user.generateAuthToken();
    res.cookie("token",token,{
        httpOnly : true,
        secure : process.env.NODE_ENV === "production",
        sameSite : "strict",
        maxAge : 7 * 24 * 60 * 60 * 1000
    });
    return res.status(200).json(user)
}

/**
 * @desc Controller for getting current user by using the token stored.
 * @access Private
 */
const currentUserController = async(req,res)=>{
    const id = req._id;
    if(!id) return res.status(402).json({message:"not valid user ! please login"})
}

/**
 * @desc Controller for user logout removes the token from the client
 * @access Public
 */
const LogoutController = async(req,res)=>{
    
}

export default {registerController,loginController,LogoutController}