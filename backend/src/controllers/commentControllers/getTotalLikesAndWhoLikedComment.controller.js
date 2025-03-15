import { Comment } from "../../models/comment.model.js";
import { asyncHandler } from "../allImports.js";

const getTotalLikesAndWhoLikedComment = asyncHandler(async (request, response) => {
    
    const {blogId} = request.params;
    
    const commentsWithLikes = await Comment.aggregate([
        {
            $match: {
                commentedBlog: blogId
            }
        },

        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "likedComment",
                as: "allLikesOnComment"
            }
        },

        {
            $lookup: {
                from: "users",
                localField: "allLikesOnComment.likedBy",
                foreignField: "_id",
                as: "whoLiked"
            }
        },

        {
            $addFields: {
                totalLikesOnComment: {
                    $size: "$allLikesOnComment",
                }
            }
        }
    ]);
});

export {getTotalLikesAndWhoLikedComment}