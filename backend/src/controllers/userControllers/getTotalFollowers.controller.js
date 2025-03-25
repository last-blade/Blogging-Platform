import { apiError, apiResponse, asyncHandler, User } from "../allImports.js";
import { Follow } from "../../models/follow.model.js"
import mongoose from "mongoose";

const getTotalFollwers = asyncHandler(async (request, response) => {
    const userId = request.params.userId?.toString();

    const foundUser = await User.findById(userId);
    
    if(!foundUser){
        throw new apiError(404, "User not found, login again.")
    }

    const allTotalFollowers = await Follow.aggregate([
        
        //first-pipeline
        {
            $match: {
                followedTo: new mongoose.Types.ObjectId(userId),
            }
        },
        //second-pipeline

        {
            $group: {
                _id: "$followedTo",
                totalFollowers: {$sum: 1},
                followerIds: {$push: "$followedBy"}
            }
        },

        //third-pipeline
        {
            $lookup: {
                from: "users",
                localField: "followerIds",
                foreignField: "_id",
                as: "followerDetails"
            }
        },
        
        //fourth-pipeline
        { 
            $unwind: "$followerDetails" 
        },

        //fifth-pipeline
        {
            $project: {
                _id: 0,
                totalFollowers: 1,
                followerDetails: {
                    _id: 1,
                    fullname: 1,
                    username: 1,
                    email: 1
                }
            }
        }
    ]);

    return response.status(200)
    .json(
        new apiResponse(200, allTotalFollowers, "Total followers fetched successfully.")
    );
});

export {getTotalFollwers}