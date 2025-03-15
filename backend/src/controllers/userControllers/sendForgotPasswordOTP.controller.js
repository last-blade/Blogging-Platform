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
            maxAge: 2 * 60 * 1000,
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

 // const {newPassword, confirmNewPassword} = request.body;
        
            // if([!newPassword, !confirmNewPassword].some((inputField) => inputField === "")){
            //     throw new apiError(400, "All fields are required.")
            // }

            // if(newPassword !== confirmNewPassword){
            //     throw new apiError(400, "Both passwords do not match!")
            // }
        
            // await sendOtpToEmail(request.user.email, "Your OTP for resetting password.");

            //  /*Yahan tak toh user se password liye hain naye wale and then naye password ko set karne se pehle otp send kar diya hai email par */
            // //ab hum user se otp maangenge jo wo wnter karega input field mein

            // const {incomingOTP} = request.body;

            // if(!incomingOTP){
            //     throw new apiError(404, "OTP is required!")
            // }

            // const foundUser = await OTP.findOne({email: request.user.email});

            // if(!foundUser){
            //     throw new apiError(400, "OTP expired, send OTP again.")
            // }

            // const databaseOTP = foundUser.otp[0];

            // if(databaseOTP !== incomingOTP){
            //     throw new apiError(400, "Incorrect OTP!")
            // }

            // return response.status(200)
            // .json(
            //     new apiResponse(200, {}, "OTP Verified")
            // )
        
            // return response.status(200)
            // .cookie("Email", email, options)
            // .json(new apiResponse(200, {}, "OTP sent successfully."));