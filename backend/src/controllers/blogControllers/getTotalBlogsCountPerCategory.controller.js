import { Blog } from "../../models/blog.model.js";
import { asyncHandler } from "../allImports.js";

const getTotalBlogsCountPerCategory = asyncHandler(async (request, response) => {
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
    ])
});

export {getTotalBlogsCountPerCategory};