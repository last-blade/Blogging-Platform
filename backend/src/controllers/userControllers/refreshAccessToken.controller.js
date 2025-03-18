import jwt from "jsonwebtoken";
import {apiError, apiResponse, asyncHandler, User} from "../allImports.js"
import { generateAccessAndRefreshToken } from "../../utils/generateAccessTokenAndRefreshToken.js";

const refreshAccessToken = asyncHandler(async (request, response) => {
    const incomingRefreshToken = request.cookies.refreshToken || request.body.refreshToken;

    if(!incomingRefreshToken){
        throw new apiError(401, "Unauthorized access!")
    }
    
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);

    const userId = decodedToken?.id;

    if(!userId){
        throw new apiError(401, "Unauthorized access or invalid refresh token!")
    }

    const foundUser = await User.findById(userId);

    if(!foundUser){
        throw new apiError(404, "User not found!")
    }

    if(incomingRefreshToken !== foundUser?.refreshToken){
        throw new apiError(401, "Invalid refresh token!")
    }

    const options = {
        httpOnly: true,
        secure: true,
    }

    const {generatedAccessToken, generatedRefreshToken} = await generateAccessAndRefreshToken();
    
    return response.status(200)
    .cookie("accessToken", generatedAccessToken, options)
    .cookie("refreshToken", generatedRefreshToken)
    .json(
        new apiResponse(201, {generatedAccessToken, generatedRefreshToken}, "Access Token refreshed.")
    )
});

export{refreshAccessToken}