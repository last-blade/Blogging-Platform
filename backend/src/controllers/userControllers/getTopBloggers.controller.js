import { fetchAllUsers } from "../../utils/fetchAllUsers.js";
import { apiError, apiResponse, asyncHandler, User } from "../allImports.js";

const getTopBloggers = asyncHandler(async (request, response) => {
    const allUsers = await fetchAllUsers();

    if(!allUsers){
        throw new apiError(404, "No user found!")
    }

    console.log("all users:\n", allUsers);
    return response.status(200)
    .json(
        new apiResponse(200, allUsers, "all users")
    )
});

export {getTopBloggers}