import { Like } from "../../models/like.model.js";
import { apiError, asyncHandler } from "../allImports.js";

const getTotalLikesAndWhoLiked = asyncHandler(async (request, response) => {
    // ab hum yahan par karenge ki, We want to find all likes related to a specific blog, so we'll match "likedBlog" with "blogId".
    const {blogId} = request.params;

    if(!blogId){
        throw new apiError(400, "Blog does not exists or reload the page!")
    }
    const totalLikes = await Like.aggregate([
        //pipeline-1
        {
            $match: {
                likedBlog: blogId, // "likedBlog" yeh field name same hona chahiye jo like model mein likha hau hai
            }
        },

        /* doosri pipeline mein humein saari ki saari likes ko collect karna hai i.e. "group" karna hai, i.e., We want to group all the "likes" based on "likedBlog". Jo blog like kiya hai uske basis par saare likes ko group karenge and then unhe count bhi toh karna hai collect karne ke baad */
        {
            // "$group" is like "grouping data by a specific field."
            $group: {
                _id: "$likedBlog",
                totalLikes: {
                    $sum: 1,
                },
                whoLikedBlog: {$push: "$likedBy"} //It pushes (stores) data from a field into an array. And yahan par 
                                                // iska matlab hai ki, "Push all the 'likedBy' user IDs into an array called "whoLiked".
                                                //See comment-1 Below
            }
        },

        {
            $lookup: {
                from: "users",
                localField: "$whoLikedBlog",
                foreignField: "_id",
                as: "userDetails",
            }
        },

        {
            $sort: {
                createdAt: -1,
            }
        }
    ])
});

export {getTotalLikesAndWhoLiked}

/*
➡️Comment-1 
Example lete hain ek real:

   likedBlog	      likedBy
65efdb1234a11d ✅	User 1 ✅
65efdb1234a11d ✅	User 2 ✅
65efdb1234a11d ✅	User 3 ✅
65efdb1234a11d ✅	User 4 ✅

//After this query->   whoLikedBlog: {$push: "$likedBy"}

{
    _id: "65efdb1234a11d",
    totalLikes: 4,
    whoLiked: [
        "User 1",
        "User 2",
        "User 3",
        "User 4"
    ]
}


*/