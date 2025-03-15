import { apiError, apiResponse, asyncHandler } from "../allImports.js";
import { OTP } from "../../models/otp.model.js";
import { sendOtpToEmail } from "../../utils/sendOtpToEmail.js";

const sendOTP = asyncHandler(async (request, response) => {
    const { email } = request.body;

    await sendOtpToEmail(email, "Your Email OTP for registration on PixelPen");

    const options = {
        httpOnly: true,
        secure: true,
        maxAge: 5 * 60 * 1000,
    };

    return response.status(200)
        .cookie("Email", email, options)
        .json(new apiResponse(200, {}, "OTP sent successfully."));
});

export {sendOTP}