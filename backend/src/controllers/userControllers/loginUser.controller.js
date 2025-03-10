import { User } from "../../models/user.model";
import { apiError, apiResponse, asyncHandler } from "../allImports";

const generateAccessAndRefreshToken = async (userId) => {
    const user = await User.findById(userId);

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({validateBeforeSave: false})

    return {accessToken, refreshToken, passwordCorrectOrNot}
}

const passwordCorrectOrNot = async () => {

}

const loginUser = asyncHandler(async (request, response) => {
    const {email, username, password} = request.body;

    if ([!(email || username), !password].some((field) => field)) {
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

    const loggedInUser = await User.findById(foundUser?._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true,
    }

    return response.status(200)
    .cookies("Access Token", accessToken, options)
    .cookies("Refresh Token", refreshToken, options)
    .json(
        new apiResponse(200, {user: loggedInUser, accessToken, refreshToken}, "Login successful")
    )


});

export {loginUser, generateAccessAndRefreshToken}