import { Blog } from "../../models/blog.model.js";
import { apiError, apiResponse, asyncHandler, User } from "../allImports.js";

const createBlog = asyncHandler(async (request, response) => {
    try {
        const {blogName, blogContent} = request.body;
        // console.log("Blogname", blogName);

        const createdBlog = await Blog.create({
            blogName,
            blogContent,
            blogOwner: request?.user.id,
        });

        const updatedUser = await User.findByIdAndUpdate(request?.user.id, {
            $push: {
                blog: createdBlog._id,
            }
        }, {new: true}).select("-password -refreshToken")

        // updatedUser.save({validateBeforeSave: false})

        console.log("createdBlog", createdBlog)

        return response.status(200)
        .json(new apiResponse(200, createdBlog, "Blog Created successfully."))
    } catch (error) {
        throw new apiError(400, `Error while creating blog ${error.message}`)
    }
});

export {createBlog}