import { Blog } from "../../models/blog.model.js";
import { apiError, apiResponse, asyncHandler, View } from "../allImports.js";

const viewBlog = asyncHandler(async (request, response) => {
    const {blogId} = request.params;

    if(!blogId){
        throw new apiError(404, "Blog not found or reload the page.")
    }

    // const userId = request?.user.id;

    // if(!userId){
    //     throw new apiError(400, "Please login!")
    // }

    const foundBlog = await Blog.findById(blogId).populate("blogOwner", "fullname email avatar");

    if(!foundBlog){
        throw new apiError(404, "Blog does not exists!")
    }

    const foundViewedBlog = await View.findOne({
        blogId,
        viewedBy: request.user.id,
    })

    if(!foundViewedBlog){
        await View.create({
            blogId,
            viewedBy: request.user.id,
        });

        foundBlog.views = foundBlog.views + 1;
        foundBlog.save({validateBeforeSave: false});
    }

    return response.status(200)
    .json(
        new apiResponse(200, foundBlog, "Blog fetched successfully.")
    )
});

export {viewBlog}