import { Blog } from "../../models/blog.model.js";
import { apiResponse, asyncHandler } from "../allImports.js";

const getCategorizedBlogsCount = asyncHandler(async (request, response) => {
    const totalCountsPerCategory = await Blog.aggregate([
        //yahan par main $unwind use kar raha hoon, to break the "blogrelatedTo" array into separate documents.
        {
            $unwind: "$blogrelatedTo",
        },

        {
            $group: {
                _id: "$blogrelatedTo",
                totalBlogs: {
                    $sum: 1,
                }
            }
        },

        {
            $project: {
                _id: 0,
                category: "$_id",
                totalBlogs: 1
            }
        },        
    ]);

    return response.status(200)
    .json(
        new apiResponse(200, totalCountsPerCategory, "Categorized blogs count fetched successfully.")
    );
});

export {getCategorizedBlogsCount};