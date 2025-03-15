import { sendOtpToEmail } from "../../utils/sendOtpToEmail.js";
import { apiError, apiResponse, asyncHandler } from "../allImports.js";

const sendForgotPasswordOTP = asyncHandler(async (request, response) => {
    try {
        const {incomingEmail} = request.body;

        if(!incomingEmail){
            throw new apiError(400, "Email is required!")
        }

        await sendOtpToEmail(incomingEmail, "OTP for resetting PixelPen account password.");

        const options = {
            httpOnly: true,
            secure: true,
            maxAge: 5 * 60 * 1000,
        }

        return response.status(200)
        .cookie("Email", incomingEmail, options)
        .json(
            new apiResponse(200, {}, "OTP Sent.")
        )

    } catch (error) {
        throw new apiError(500, "Something went wrong!");
    }

});

export {sendForgotPasswordOTP}