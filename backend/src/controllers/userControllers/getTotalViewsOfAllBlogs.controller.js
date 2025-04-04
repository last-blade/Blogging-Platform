import mongoose from "mongoose";
import { Blog } from "../../models/blog.model.js";
import { apiResponse, asyncHandler, View } from "../allImports.js";

const getTotalViewsOfAllBlogs = asyncHandler(async (request, response) => {
    const { randomUserId } = request.params;
    const loggedInUserId = request.user.id;

    const userId = randomUserId || loggedInUserId;

    const allBlogsTotalViews = await Blog.aggregate([
        {
            $match: {
                blogOwner: new mongoose.Types.ObjectId(userId),
            }
        },
        {
            $lookup: {
                from: "views",
                localField: "_id",
                foreignField: "blogId",
                as: "views"
            }
        },
        {
            $project: {
                title: 1, 
                totalViews: { $size: "$views" } 
            }
        },
        {
            $group: {
                _id: null,
                totalViews: { $sum: "$totalViews" } 
            }
        }
    ]);

    return response.status(200).json(
        new apiResponse(200, allBlogsTotalViews[0] || { totalViews: 0 }, "Total Views Of All Blogs Fetched Successfully")
    );
});

export { getTotalViewsOfAllBlogs };
