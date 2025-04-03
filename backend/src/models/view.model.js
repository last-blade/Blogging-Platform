import mongoose, {mongo, Schema} from "mongoose";

const viewSchema = new Schema({
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true,
    },

    viewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {timestamps: true});

export const View = mongoose.model("View", viewSchema);