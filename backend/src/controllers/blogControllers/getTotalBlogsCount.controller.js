import { apiError, apiResponse, asyncHandler, User } from "../allImports.js";

const getTotalBlogsCount = asyncHandler(async (request, response) => {
    const userId = request.user.id;

    if(!userId){
        throw new apiError(404, "User not found, login again.")
    }

    const foundUser = await User.findById(userId);

    if(!foundUser){
        throw new apiError(404, "User not found!")
    }

    const totalBlogsCount = foundUser.blog.length;

    return response.status(200)
    .json(
        new apiResponse(200, {blogsCount: totalBlogsCount}, "Total blogs count fetched successfully.")
    );
});

export {getTotalBlogsCount}