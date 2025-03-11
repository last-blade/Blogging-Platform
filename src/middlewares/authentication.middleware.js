import {asyncHandler} from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js"; 
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const authentication = asyncHandler(async (request, response, next) => {
    try {
            const incomingAccessToken = request.cookies?.accessToken;
        
            if(!incomingAccessToken){
                throw new apiError(401, "User is not authenticated");
            }
    
            const decodedAccessToken = jwt.verify(incomingAccessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
        
            if(!decodedAccessToken){
                throw new apiError(401, "User is not authenticated");
            }
        
            const userId = decodedAccessToken?.id;
            
            const foundUser = await User.findById(userId).select("-password -refreshToken");
        
            if(!foundUser){
                throw new apiError(404, "Please login")
            }
        
            request.user = foundUser;
            next();
    } catch (error) {
        throw new apiError(404, "PLease login")
    }
});

export {authentication}