import { apiError, apiResponse, asyncHandler, User } from "../allImports.js";


const logoutUser = asyncHandler(async (request, response) => {
    const user = request?.user;

    if(!user){
        throw new apiError(400, "PLease login")
    }

    const userId = user.id;

    const logoutUser = await User.findByIdAndUpdate(userId, {
        $unset: {
            refreshToken: 1 // "unset" operator jo hai remove kar dega "refreshToken" from the document, and "1" ek true flag hai
        }
    }, {new: true});

    const options = {
        httpOnly: true,
        secure: true,
    }

    return response.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new apiResponse(200, {}, "Logout successfully")
    )
});

export {logoutUser}