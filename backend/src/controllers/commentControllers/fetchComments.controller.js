import { Comment } from "../../models/comment.model.js";
import { apiError, apiResponse, asyncHandler } from "../allImports.js";

const fetchComments = asyncHandler(async (request, response) => {
    const {blogId} = request.params;

    if(!blogId){
        throw new apiError(400, "Blog not found or reload the page.")
    }
    // Yahan par main saare comments ko find karunga related to a specific blog like "Blog-A" ke kuch comments honge to uske hi comments display karunga frontend par.
    const allCommentsCorrespondingToBlog = await Comment.find({
        $and: [
            {commentedBlog: blogId},
        ]
    }).populate("commenter", "fullname username avatar"); /* What does populate("commenter", "fullname username avatar") do? See comment-1 below */

    if(allCommentsCorrespondingToBlog.length === 0){ // oopar jo "find" method use kiya hai woh array return karta hai.
        return response.status(200)
        .json(
            new apiResponse(200, {}, "No comments yet.")
        )
    }

    return response.status(200)
    .json(
        new apiResponse(200, allCommentsCorrespondingToBlog, "Comments fetched successfully.")
    )

});

export {fetchComments}

/*
➡️Comment-1
"commenter" → Yeh field name hai "comment model" mein see there.
"fullname username avatar" → Specific fields from the User Model that I want to access

//Without Populate:
{
    "comment": "Nice Blog",
    "commenter": "65eb946ffed22d8739d7f991" 
}

//With Populate
{
    "comment": "Nice Blog",
    "commenter": {
        "_id": "65eb946ffed22d8739d7f991",
        "fullname": "Prashant Tyagi",
        "username": "prashantcodes",
        "avatar": "profile.jpg"
    }
}

populate() automatically fetches the user data from the User Model
No need to manually query the User Model again

*/