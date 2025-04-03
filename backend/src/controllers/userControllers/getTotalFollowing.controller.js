import mongoose from "mongoose";
import { apiResponse, asyncHandler, Follow } from "../allImports.js";

const getTotalFollowing = asyncHandler(async (request, response) => {
    const {randomUserId} = request?.params;
    const loggedInUserId = request?.user.id;

    if(randomUserId){
        var totalFollowings = await Follow.aggregate([
            {
                $match: {
                    followedTo: new mongoose.Types.ObjectId(randomUserId),  
                }
            },

            {
                $facet: {
                    totalFollowing: [{$count: "followings"}],
                    followingData: [
                        {
                            $sort: {date: -1}
                        },

                        {
                            $lookup: {
                                from: "users",
                                localField: "followedBy",
                                foreignField: "_id",
                                as: "userDetails"
                            },
                        },

                        {
                            $unwind: "$userDetails",
                        },
                        
                        {
                            $project: {followedTo: 0, _id: 0, updatedAt: 0, "userDetails.password": 0, "userDetails.refreshToken": 0, "userDetails.__v": 0, "userDetails.createdAt": 0, "userDetails.email": 0, "userDetails._id": 0, "userDetails.savedBlogs": 0,}
                        },
                    ],
                }
            }
        ])
    }

    else{
        var totalFollowings = await Follow.aggregate([
            {
                $match: {
                    followedTo: new mongoose.Types.ObjectId(loggedInUserId),  
                }
            },

            {
                $facet: {
                    totalFollowing: [{$count: "followings"}],
                    followingData: [
                        {
                            $sort: {date: -1}
                        },

                        {
                            $lookup: {
                                from: "users",
                                localField: "followedBy",
                                foreignField: "_id",
                                as: "userDetails"
                            },
                        },

                        {
                            $unwind: "$userDetails",
                        },
                        
                        {
                            $project: {followedTo: 0, _id: 0, updatedAt: 0, "userDetails.password": 0, "userDetails.refreshToken": 0, "userDetails.__v": 0, "userDetails.createdAt": 0, "userDetails.email": 0, "userDetails._id": 0, "userDetails.savedBlogs": 0,}
                        },
                    ],
                }
            }
        ])
    }

    return response.status(200)
    .json(
        new apiResponse(200, totalFollowings, "Total followings fetched successfully")
    )
});

export {getTotalFollowing}