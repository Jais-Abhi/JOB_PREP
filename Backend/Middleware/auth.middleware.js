import User from "../Models/user.model.js";

const isAuth = async (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message : "Unauthorized access ! Please login"});
    }
    const userId = await User.getUserIdFromToken(token);
    if(!userId) return res.status(401).json({message : "Unauthorized access ! Please login"});
    req._id = userId;
    next();
}

export default isAuth;