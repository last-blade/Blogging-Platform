import { Blog } from "../../models/blog.model.js";
import { fetchAllUsers } from "../../utils/fetchAllUsers.js";
import { apiResponse, asyncHandler, User } from "../allImports.js";





const fetchAllUsersBlogs = asyncHandler(async (request, response) => {
    const allUsers = await fetchAllUsers();
    const allBlogIds = allUsers.flatMap(user => user.blog); 

    const allBlogs = await Blog.find({_id: {$in: allBlogIds}})
    return response.status(200)
    .json(new apiResponse(200, allBlogs, "All blogs fetched successfully"))
});

export {fetchAllUsersBlogs}