import { apiError, apiResponse, asyncHandler, User } from "../allImports.js";

const updateEmail = asyncHandler(async (request, response) => {
    const userId = request.user.id;



    const {email} = request.body;

    if(!email){
        throw new apiError(400, "email is required.")
    }

    const foundingUser = await User.findOne({email: email});
    // console.log("Found User", foundingUser)

    if(foundingUser){
        throw new apiError(400, "User with this email already exists.")
    }

    const foundUser = await User.findByIdAndUpdate(userId, {
        $set: {
            email: email
        }
    }, {new: true});

    if(!foundUser){
        throw new apiError(400, "User not found")
    }
    
    return response.status(200)
    .json(new apiResponse(200, {}, "email changed successfully"));
});

export {updateEmail}