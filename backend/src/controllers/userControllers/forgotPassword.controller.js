import { sendMail } from "../../utils/sendEmail.js";
import { apiError, apiResponse, asyncHandler, User } from "../allImports.js";

const forgotPassword = asyncHandler(async (request, response) => {
    const {newPassword, confirmNewPassword} = request.body;
    const incomingEmail = request.cookies?.Email;
    
    if([!newPassword, !confirmNewPassword].some((inputField) => inputField === "")){
        throw new apiError(400, "All fields are required.")
    }

    if(newPassword !== confirmNewPassword){
        throw new apiError(400, "Both passwords do not match!")
    }

    const foundUser = await User.findOneAndUpdate({email: incomingEmail});

    foundUser.password = newPassword;
    foundUser.save({validateBeforeSave: false})

    if(!foundUser){
        throw new apiError(404, "Session expired!")
    }

    const bodyOfEmail = `
    <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.5;">
        <h2 style="color: #333333;">Your PixelPen Account Password Has Been Successfully Changed!</h2>
        <p>Hey ${foundUser.fullname},</p>
        <p>We wanted to let you know that your password has been successfully updated. If you made this change, you're all set!</p>
        <p>If you didn't change your password, please reset your password immediately or contact our support team.</p>
        <br />
        <p>Thank you for using PixelPen!</p>
        <p>Team PixelPen</p>
    </div>`;


    await sendMail(incomingEmail, "PixelPen account password changed", bodyOfEmail)

    return response.status(200)
    .json(
        new apiResponse(200, {}, "Password changed.")
    )
});

export {forgotPassword}