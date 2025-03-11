import { request } from "express";
import { asyncHandler } from "../allImports.js";
import { sendMail } from "../../utils/sendEmail.js";

const sendOTP = asyncHandler(async (request, response) => {
    const {email} = request.body;
    const OTP = Math.floor(1000 + Math.random() * 9000);
    console.log(OTP);

    sendMail(email, "Your Email OTP for registration on PixelPen", `Please find your One Time Password (OTP) ${OTP} and Please don't share this OTP with others.`)

    
})