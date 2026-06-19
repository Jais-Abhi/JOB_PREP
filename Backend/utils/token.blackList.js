import BlackListToken from "../Models/blackList.token.model.js";

const isBlackListed = async (token)=>{
    const blackListToken = await BlackListToken.findOne({token})
    if(blackListToken) return true;
    return false;
}

const setBlackListToken = async (token)=>{
    const blackListToken = await BlackListToken.create({token});
    return blackListToken;
}

export {isBlackListed, setBlackListToken};