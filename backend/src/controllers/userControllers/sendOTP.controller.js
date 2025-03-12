import { request } from "express";
import { apiError, apiResponse, asyncHandler } from "../allImports.js";
import { sendMail } from "../../utils/sendEmail.js";
import { OTP } from "../../models/otp.model.js";

const generateOTP = () => {
    const generatedOTP = Math.floor(1000 + Math.random() * 9000);
    return generatedOTP;
}

const sendOTP = asyncHandler(async (request, response) => {
    const {email} = request.body;

    const existingOTP = await OTP.findOne({email: email});

    if(existingOTP){
        throw new apiError(429, "Please wait before requesting a new OTP.")
    }

    const generatedOTP = generateOTP();

    await sendMail(email, "Your Email OTP for registration on PixelPen", `Please find your One Time Password (OTP) ${generatedOTP} and Please don't share this OTP with others.`)

    await OTP.findOneAndUpdate(
        { email },
        { $push: { otp: generatedOTP }, createdAt: new Date() },
        { new: true, upsert: true } /* so 'upsert' is using because the otp im sending to an email does not exists in database, that's why I am using upsert
        */
    );
    
    
    return response.status(200)
    .json(
        new apiResponse(200, {}, "OTP sent successfully.")
    );
});

export {sendOTP}