import { Blog } from "../../models/blog.model.js";
import {apiError, apiResponse, asyncHandler, User} from "../allImports.js"

const deleteBlog = asyncHandler(async (request, response) => {
    const {blogId} = request.params;

    if(!blogId){
        throw new apiError(404, "Blog not found!")
    }

    const userId = request?.user.id;

    if(!userId){
        throw new apiError(404, "Session expired, login again.")
    }

    const foundUser = await User.findById(userId);

    if(!foundUser){
        throw new apiError(404, "User not found!")
    }

    if(!foundUser.blog.includes(blogId)){
        throw new apiError(404, "Blog does not exists!")
    }

    await User.findByIdAndUpdate(userId, {
        $pull: {
            blog: blogId // blogs jo hain array form mein store hain, isliye hu "pull" operaor kaa use karenge, agar object wagreah mein hota toh fir "unset" operator kaa use karte.
        }
    }, {new: true});

    await Blog.findByIdAndDelete(blogId);

    return response.status(200)
    .json(
        new apiResponse(200, "Blog deleted.")
    );
    
});

export {deleteBlog}