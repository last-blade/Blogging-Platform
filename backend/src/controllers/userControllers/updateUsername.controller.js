import { apiError, apiResponse, asyncHandler, User } from "../allImports.js";

const updateUsername = asyncHandler(async (request, response) => {
    const userId = request.user.id;

    const {username} = request.body;

    if(!username){
        throw new apiError(400, "Username is required.")
    }

    const foundUser = await User.findByIdAndUpdate(userId, {
        $set: {
            username: username
        }
    }, {new: true});

    if(!foundUser){
        throw new apiError(400, "User not found.")
    }
    
    return response.status(200)
    .json(new apiResponse(200, {}, "Username changed successfully."));
});

export {updateUsername}