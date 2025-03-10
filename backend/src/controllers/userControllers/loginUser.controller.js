import { generateAccessAndRefreshToken } from "../../utils/generateAccessTokenAndRefreshToken.js";
import { apiError, apiResponse, asyncHandler, User } from "../allImports.js";

const loginUser = asyncHandler(async (request, response) => {
    const {email, username, password} = request.body;

    if (!(email || username) || !password) {
        throw new apiError(404, "Email or Username and Password are required.");
    };

    const foundUser = await User.findOne({
        $or: [{email}, {username}]
    });

    if(!foundUser){
        throw new apiError(400, "User with this email or username does not exists.")
    };

    const isPasswordValid = await foundUser.isPasswordCorrect(password);

    if(!isPasswordValid){
        throw new apiError(400, "Incorrect Password.")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(foundUser?._id);

    const loggedInUser = await User.findById(foundUser?._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
    }

    return response.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new apiResponse(200, {user: loggedInUser}, "User loggedin successfully.")
    )
});

export {loginUser}