import { request } from "express";
import { apiError, apiResponse, asyncHandler } from "../allImports.js";
import { sendMail } from "../../utils/sendEmail.js";
import { OTP } from "../../models/otp.model.js";

const generateOTP = () => {
    const OTP = Math.floor(1000 + Math.random() * 9000);
    return OTP;
}

const sendOTP = asyncHandler(async (request, response) => {
    const {email} = request.body;

    const existingOTP = await OTP.findOne({email: email});

    if(existingOTP){
        throw new apiError(429, "Please wait before requesting a new OTP.")
    }

    const generatedOTP = generateOTP();

    await OTP.findOneAndUpdate(
        { email },
        { generatedOTP, createdAt: new Date() },
        { upsert: true, new: true }
    );

    await sendMail(email, "Your Email OTP for registration on PixelPen", `Please find your One Time Password (OTP) ${OTP} and Please don't share this OTP with others.`)
    
    return response.status(200)
    .json(200, {}, "OTP sent successfully.");
})