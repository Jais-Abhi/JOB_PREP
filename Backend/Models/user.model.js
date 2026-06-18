import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema  = new mongoose.Schema({
    name : {
        type: String,
        required : [true, "Name is required"]
    },
    email : {
        type: String,
        required : [true, "Email is required"],
        unique : true
    },
    password : {
        type: String,
        required : [true, "Password is required"]
    },
},{
    timestamps : true
    })

    userSchema.methods.generateAuthToken = async function(){
        const token = await jwt.sign({_id : this._id},process.env.JWT_SECRET,{expiresIn: "7d"})
        return token;
    }

    userSchema.methods.validatePassword = function(hashedPassword){
        return bcrypt.compare(hashedPassword,this.password)
    }

    userSchema.statics.hashedPassword = async function(password){
        return bcrypt.hash(password,10);
    }

    userSchema.statics.getUserIdFromToken = async function(token){
        try{
            const decoded = await jwt.verify(token,process.env.JWT_SECRET);
            return decoded._id;
        } catch (error) {
            throw new Error("Invalid token");
        }
    }


const User = mongoose.model("User", userSchema)

export default User