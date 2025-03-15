import { Like } from "../../models/like.model.js";
import { apiResponse, asyncHandler } from "../allImports.js";

const likeComment = asyncHandler(async (request, response) => {
    const {commentId} = request.params;

    if(!commentId){
        throw new apiError(404, "Comment does not exists or something went wrong")
    }

    const userId = request.user?.id;

    if(!userId){
        throw new apiError(400, "Please login!")
    }

    const isLiked = await Like.findOne({
        likedComment: commentId,
        likedBy: userId
    });

    if(isLiked){
        await Like.findOneAndDelete({
            $and: [
                {likedComment: commentId},
                {likedBy: userId}
            ]
        });

        return response.status(200)
        .json(
            new apiResponse(200, {}, "Comment unliked.")
        )
    }

    await Like.create({
        likedComment: commentId,
        likedBy: userId,
    });

    return response.status(200)
    .json(
        new apiResponse(200, {}, "Comment Liked.")
    )
});

export {likeComment}