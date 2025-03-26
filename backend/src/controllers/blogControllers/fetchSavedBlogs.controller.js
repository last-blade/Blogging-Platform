import { apiError, apiResponse, asyncHandler, User } from "../allImports.js";

const fetchSavedBlogs = asyncHandler(async (request, response) => {
    const userId = request?.user.id;

    if(!userId){
        throw new apiError(404, "User not found, login again")
    }

    const foundUser = await User.findById(userId).populate("savedBlogs", "blogName blogContent blogOwner blogrelatedTo");

    if(!foundUser){
        throw new apiError(404, "User does not exists!")
    }

    const allSavedBlogs = foundUser.savedBlogs;

    return response.status(200)
    .json(
        new apiResponse(200, allSavedBlogs, "Saved blogs fetched successfully.")
    )
});

export {fetchSavedBlogs}