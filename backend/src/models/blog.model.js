import mongoose, {mongo, Schema} from "mongoose";

const blogSchema = new Schema({
    blogName: {
        type: String,
        required: true,
    },

    blogContent: {
        type: String,
        required: true,
    },

    blogOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    blogrelatedTo: [
        {
            type: String,
            required: true,
            set: (value) => value.toLowerCase(),
        }
    ],

    views: {
        type: Number,
        default: 0
    },

}, {timestamps: true});

blogSchema.index({ blogrelatedTo: 1 });

export const Blog = mongoose.model("Blog", blogSchema);