import mongoose, {Schema} from "mongoose";

const otpSchema = new Schema({
    otp: {
        type: Number,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
    },

    createdAt: { 
        type: Date, 
        default: Date.now, 
        expires: 300,
    },
}, {timestamps: true})

export const OTP = mongoose.model("OTP", otpSchema);