import { apiError, apiResponse, asyncHandler, User } from "../allImports.js";

const updateName = asyncHandler(async (request, response) => {
    const userId = request.user.id;

    const foundUser = await User.findById(userId);

    const {fullname} = request.body;

    if(!fullname){
        throw new apiError(404, "Fullname is required.")
    }

    foundUser.fullname = fullname;

    foundUser.save({validateBeforeSave: false});
    
    return response.status(200)
    .json(new apiResponse(200, {}, "Fullname changed successfully"));
});

export {updateName}