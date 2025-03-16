import { Blog } from "../../models/blog.model.js";
import { apiError, apiResponse, asyncHandler } from "../allImports.js";

const editBlog = asyncHandler(async (request, response) => {
    try {
        const {blogContent} = request.body

        const {blogId} = request.params;
        
        if(!blogId){
            throw new apiError(400, "Blog ID is required!");
        }

        if(!blogContent){
            throw new apiError(400, "Blog body can not be empty!")
        }

        console.log(blogContent)

        const foundUser = request?.user;

        if(!foundUser){
            throw new apiError(400, "Please login!")
        }
        const userId = foundUser.id;

        console.log("userid", userId)

        const updatedBlog = await Blog.findByIdAndUpdate({blogId: blogId, author: userId} , {
            $set: {
                blogContent: blogContent
            }
        }, {new: true});

        return response.status(200)
        .json(new apiResponse(201, updatedBlog, "Blog updated!"))

    } catch (error) {
        throw new apiError(500 || error.code, error.message)
    }
});

export {editBlog}