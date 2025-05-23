import { Like } from "../../models/like.model.js";
import {apiError, apiResponse, asyncHandler} from "../allImports.js"

const likeBlog = asyncHandler(async (request, response) => {
    const {blogId} = request.params;

    if(!blogId){
        throw new apiError(404, "Blog does not exists or something went wrong")
    }

    const userId = request.user?.id;

    if(!userId){
        throw new apiError(400, "Please login!")
    } 
    
    const isLiked = await Like.findOne({
        likedBlog: blogId,
        likedBy: userId
    });

    if(isLiked){
        await Like.findOneAndDelete({
            $and: [
                { likedBy: userId },
                { likedBlog: blogId }
            ]
        });

        return response.status(200)
        .json(
            new apiResponse(200, {}, "Blog unliked.")
        )
    };

    await Like.create({
        likedBlog: blogId,
        likedBy: userId,
    });

    return response.status(200)
    .json(
        new apiResponse(200, {}, "Blog Liked.")
    )
});

export {likeBlog}