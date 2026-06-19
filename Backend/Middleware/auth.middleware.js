import User from "../Models/user.model.js";
import { isBlackListed } from "../utils/token.blackList.js";

const isAuth = async (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message : "Unauthorized access ! Please login"});
    }
    if(await isBlackListed(token)) 
        return res.status(401).json({message : "Unauthorized access ! Please login"});


    const userId = await User.getUserIdFromToken(token);
    if(!userId) return res.status(401).json({message : "Unauthorized access ! Please login"});
    req._id = userId;
    next();
}

export default isAuth;