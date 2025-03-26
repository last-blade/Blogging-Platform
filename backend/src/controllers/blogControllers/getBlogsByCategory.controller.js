import { Blog } from "../../models/blog.model.js";
import { apiError, apiResponse, asyncHandler } from "../allImports.js";

const getBlogsByCategory = asyncHandler(async (request, response) => {
    let { category } = request.params;
    category = category.toLowerCase();

    if (!category) {
        throw new apiError(400, "Category is required.");
    }

    const blogs = await Blog.find({
        blogrelatedTo: { $in: [category] }
    });

    if(blogs.length < 1){
        return response.status(200)
        .json (
            new apiResponse(200, {}, `No blogs found related to ${category}`)
        );
    }

    return response.status(200)
    .json(
        new apiResponse(200, blogs, "Categorized blogs fetched successfully")
    );
});

export {getBlogsByCategory}