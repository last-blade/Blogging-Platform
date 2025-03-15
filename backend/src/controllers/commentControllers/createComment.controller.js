import { Blog } from "../../models/blog.model.js";
import { Comment } from "../../models/comment.model.js";
import { apiError, apiResponse, asyncHandler } from "../allImports.js";

const createComment = asyncHandler(async (request, response) => {
    try {
            const {blogId} = request.params;
            const {comment} = request.body;
        
            if(!comment){
                throw new apiError(400, "Can not send empty comment.")
            }
        
            if(!blogId){
                throw new apiError(400, "Blog does not exists or reload the page.")
            }
        
            const userId = request.user?.id;
        
            if(!userId){
                throw new apiError(400, "Please login!")
            }
        
            await Comment.create({
                comment: comment,
                commenter: userId,
                commentedBlog: blogId,
            });
        
            const blog = await Blog.findById(blogId);
        
            return response.status(200)
            .json(
                new apiResponse(201, `You commented on ${blog.blogName} blog.`)
            )
    } catch (error) {
        throw new apiError(500, "Something went wrong.")
    }
});

export {createComment}