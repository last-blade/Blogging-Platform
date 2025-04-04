import { Blog } from "../../models/blog.model.js";
import { apiResponse, asyncHandler } from "../allImports.js";

const trendingTopics = asyncHandler(async (request, response) => {
    const trendingTopics = await Blog.aggregate([
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

        {
            $sort: {totalBlogs: -1},
        },

        {
            $limit: 10,
        }
    ]);

    return response.status(200)
    .json(
        new apiResponse(200, trendingTopics, "Trending Topics Fetched Successfully")
    )
});

export {trendingTopics}