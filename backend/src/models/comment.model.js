import mongoose, {Schema} from "mongoose";

const commentSchema = new Schema({
    comment: {
        type: String,
    },

    commenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
    },
}, {timestamps: true})