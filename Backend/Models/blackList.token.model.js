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
        expires: 14400  // 4 hours in seconds (4 * 60 * 60)
    }
});

// Create TTL index to automatically delete documents after 4 hours
blackListTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 14400 });

const BlackListToken = mongoose.model('BlackListToken', blackListTokenSchema);

export default BlackListToken;