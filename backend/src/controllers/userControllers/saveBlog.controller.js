import { Blog } from "../../models/blog.model.js";
import {apiError, apiResponse, asyncHandler, User} from "../allImports.js"

const saveBlog = asyncHandler(async (request, response) => {
    const {blogId} = request?.params;
    const userId = request?.user.id;

    if(!blogId){
        throw new apiError(404, "Blog not found!")
    }

    if(!userId){
        throw new apiError(404, "User not found!")
    }

    const foundUser = await User.findById(userId);

    if(!foundUser){
        throw new apiError(404, "User not found, login again!")
    }

    const foundBlog = await Blog.findById(blogId);

    if(!foundBlog){
        throw new apiError(404, "Blog not found!")
    }

    const isblogAlreadySaved = foundUser.savedBlogs.includes(blogId);

    if(isblogAlreadySaved){
        await User.findByIdAndUpdate(userId, {
            $unset: {
                savedBlogs: 1,
            }
        })
        return response.status(200)
        .json(
            new apiResponse(200, {}, "Blog unsaved.")
        )
    }

    await User.findByIdAndUpdate(userId, {
        savedBlogs: blogId,
    }, {new: true}).select("-password -refreshToken");

    return response.status(200)
    .json(
        new apiResponse(200, {}, "Blog saved.")
    )
});

export {saveBlog}