import { OTP } from "../../models/otp.model.js";
import { apiError, apiResponse, asyncHandler } from "../allImports.js";

const verifyOTP = asyncHandler(async (request, response) => {
    const {otp} = request.body;
    const email = request.cookies.Email;
    
    if(!otp){
        throw new apiError(400, "OTP is required.")
    }

    const foundUser = await OTP.findOne({email});

    console.log("user", foundUser)

    if(!foundUser){
        throw new apiError(400, "OTP expired, send OTP again.")
    }

    const databaseOTP = foundUser.otp[0];

    if(otp !== databaseOTP){
        throw new apiError(400, "Incorrect OTP.")
    }

    return response.status(200)
    .json(
        new apiResponse(200, {}, "OTP verified.")
    )
    
});

export {verifyOTP}