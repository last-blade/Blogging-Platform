import { sendMail } from "../../utils/sendEmail.js";
import { apiError, apiResponse, asyncHandler, User } from "../allImports.js";

const changePassword = asyncHandler(async (request, response) => {
    const {oldPassword, newPassword, confirmPassword} = request.body;

    if(!(oldPassword && newPassword && confirmPassword)){
        throw new apiError(404, "All fields are required!")
    }

    if(newPassword !== confirmPassword){
        throw new apiError(400, "Both passwords do not match!")
    }

    const userId = request?.user.id;

    if(!userId){
        throw new apiError(400, "Please login.")
    }

    const foundUser = await User.findById(userId);

    if(!foundUser){
        throw new apiError(404, "User not found!")
    }

    const oldPasswordValid = await foundUser.isPasswordCorrect(oldPassword);

    if(oldPassword === newPassword){
        throw new apiError(400, "New password cannot be the same as old password!")
    }

    if(!oldPasswordValid){
        throw new apiError(400, "Old password is incorrect!")
    }

    foundUser.password = newPassword;
    foundUser.save({validateBeforeSave: false});

    const subject = "PixelPen Password Changed Successfully!";

    const emailBody = `<div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.5;">
            <h2 style="color: #333333;">Your PixelPen Password Has Been Changed!</h2>
            <p>Hey ${foundUser.fullname},</p>
            <p>Your password has been successfully updated. If this was you, no further action is needed.</p>
            <p>If you didn't change your password, please reset your password immediately or contact our support team.</p>
            <br />
            <p>Thank you for using PixelPen!</p>
            <p>Team PixelPen</p>
        </div>`;

    await sendMail(foundUser.email, subject, emailBody)

    return response.status(200)
    .json(
        new apiResponse(200, {}, "Password changed successfully.")
    )
});

export{changePassword}