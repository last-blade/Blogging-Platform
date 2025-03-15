import { apiError, apiResponse, asyncHandler, User } from "../allImports.js";

const forgotPassword = asyncHandler(async (request, response) => {
    const {newPassword, confirmNewPassword} = request.body;
    
    if([!newPassword, !confirmNewPassword].some((inputField) => inputField === "")){
        throw new apiError(400, "All fields are required.")
    }

    if(newPassword !== confirmNewPassword){
        throw new apiError(400, "Both passwords do not match!")
    }

    const foundUser = await User.findByIdAndUpdate(request.user?.id, {
        $set: {
            password: newPassword
        }
    });

    if(!foundUser){
        throw new apiError(404, "Please login!")
    }

    return response.status(200)
    .json(
        new apiResponse(200, {}, "Password changed.")
    )
});

export {forgotPassword}