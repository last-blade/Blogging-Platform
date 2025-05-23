import { verifyOtpHelper } from "../../utils/verifyOtpHelper.js";
import { apiError, apiResponse, asyncHandler } from "../allImports.js";

const verifyForgotPasswordOTP  = asyncHandler(async (request, response) => {
    const incomingEmail = request.cookies.Email;
    const {incomingOTP} = request.body;

    if(!incomingOTP){
        throw new apiError(404, "OTP required!")
    }

    if(!incomingEmail){
        throw new apiError(400, "OTP expired, resend OTP")
    }

    await verifyOtpHelper(incomingEmail, incomingOTP);

    return response.status(200)
    .json(
        new apiResponse(200, {}, "OTP verified.")
    );
});

export {verifyForgotPasswordOTP}