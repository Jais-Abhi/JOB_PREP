import mongoose from "mongoose";

const blackListTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires:  7*24*60*60  // 7 days in seconds (7 * 24 * 60 * 60)
    }
});

const BlackListToken = mongoose.model('BlackListToken', blackListTokenSchema);

export default BlackListToken;