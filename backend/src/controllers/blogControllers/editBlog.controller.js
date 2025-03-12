import { Blog } from "../../models/blog.model.js";
import { apiError, asyncHandler } from "../allImports.js";

const editBlog = asyncHandler(async (request, response) => {
    try {
        const {blogContent} = request.body
        
        if(!blogContent){
            throw new apiError(400, "Blog body can not be empty!")
        }

        const foundUser = request?.user;

        if(!foundUser){
            throw new apiError(400, "Please login!")
        }
        const userId = foundUser.id;

        await Blog.findByIdAndUpdate(userId, {
            $set: {
                blogContent: blogContent,
            }
        }, {new: true});

        return response.status(200)
        .json(201, {}, "Blog updated!")

    } catch (error) {
        throw new apiError(500 || error.code, error.message)
    }
});

export {editBlog}