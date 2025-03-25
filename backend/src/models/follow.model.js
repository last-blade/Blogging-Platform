import mongoose, { Schema } from "mongosoe";

const followSchema = new Schema({
        followeTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        followedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
}, {timestamps: true});

export const Follow = mongoose.mode("Follow", followSchema);