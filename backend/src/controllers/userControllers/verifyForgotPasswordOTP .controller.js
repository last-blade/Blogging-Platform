import { OTP } from "../../models/otp.model.js";
import { verifyOtpHelper } from "../../utils/verifyOtpHelper.js";
import { apiError, apiResponse, asyncHandler } from "../allImports.js";

const verifyForgotPasswordOTP  = asyncHandler(async (request, response) => {
    const incomingEmail = request.cookies.Email;
    const {incomingOTP} = request.body;

    if(!incomingEmail){
        throw new apiError(400, "OTP expired, resend OTP")
    }

    await verifyOtpHelper(incomingEmail, incomingOTP);

    return response.status(200)
    .json(
        new apiResponse(200, {}, "OTP verified.")
    );
})