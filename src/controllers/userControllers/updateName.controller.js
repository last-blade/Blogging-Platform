import { apiError, apiResponse, asyncHandler, User } from "../allImports.js";

const updateName = asyncHandler(async (request, response) => {
    const userId = request.user.id;



    const {fullname} = request.body;

    if(!fullname){
        throw new apiError(400, "Fullname is required.")
    }

    const foundUser = await User.findByIdAndUpdate(userId, {
        $set: {
            fullname: fullname
        }
    }, {new: true});

    if(!foundUser){
        throw new apiError(400, "User not found")
    }
    
    return response.status(200)
    .json(new apiResponse(200, {}, "Fullname changed successfully"));
});

export {updateName}

//    foundUser.fullname = fullname;

// foundUser.save({validateBeforeSave: false});