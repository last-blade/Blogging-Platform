import mongoose, { mongo, Schema } from "mongoose";

const likeSchema = new Schema({
    likedBlog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    },

    likedComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    },

    likedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, {timestamps: true});

export const Like = mongoose.model("Like", likeSchema);