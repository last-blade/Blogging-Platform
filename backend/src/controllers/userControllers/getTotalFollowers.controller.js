import { apiError, apiResponse, asyncHandler, User } from "../allImports.js";
import { Follow } from "../../models/follow.model.js"

const getTotalFollwers = asyncHandler(async (request, response) => {
    const userId = request?.user.id;

    const foundUser = await User.findById(userId);

    if(!foundUser){
        throw new apiError(404, "User not found, login again.")
    }

    const totalFollowers = await Follow.aggregate([
        
        //first-pipeline
        {
            $match: {
                followedTo: userId,
            }
        }
    ]);
    
});

export {getTotalFollwers}