import { Follow } from "../../models/follow.model.js";
import { apiError, apiResponse, asyncHandler, User } from "../allImports.js";

const follow = asyncHandler(async (request, response) => {
    try {
            const userId = request?.user.id;

            const {whomToFollowUserId} = request.params;

            const foundUser = await User.findById(userId).select("-password -refreshToken");
        
            if(!foundUser){
                throw new apiError(404, "User not found, login again.")
            }
        
            if(!whomToFollowUserId){
                throw new apiError(404, "User does not exists.")
            }

            const whomToFollowUser = await User.findById(whomToFollowUserId).select("-password -refreshToken");

            if(!whomToFollowUser){
                throw new apiError(404, "User to follow does not exists.")
            }

            if (userId === whomToFollowUserId) {
                throw new apiError(400, "You cannot follow yourself.");
            }      
            
            const existingFollow = await Follow.findOne({
                followedTo: whomToFollowUserId,
                followedBy: userId,
            });

            console.log("exists", existingFollow)
        
            if (existingFollow) {
                throw new apiError(400, "You are already following this user.");
            }

            const newFollow = new Follow({
                followedTo: whomToFollowUserId,
                followedBy: userId,
            });
        
            await newFollow.save({validateBeforeSave: false});
            
            return response.status(200)
            .json(
                new apiResponse(200, {}, "Followed Successfully.")
            )
    } catch (error) {
        return response.status(error.statusCode || 500).json(
            new apiResponse(error.statusCode || 500, {}, error.message || "Something went wrong!")
        );
     }
});

export  {follow}