import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    avatar: {
        type: String,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    refreshToken: {
      type: String,
    },

    blog: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      }
    ]
  },
  { timestamps: true }
);

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }

    else{
        this.password = await bcrypt.hash(this.password, 10)
    }
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
};

userSchema.methods.generateAccessToken = function () {
  const accessToken = jwt.sign(
    {
      id: this._id,
      email: this.email,
      username: this.username,
    },

    process.env.ACCESS_TOKEN_SECRET_KEY,

    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    },
  );

  return accessToken;
};

userSchema.methods.generateRefreshToken = function(){
    const refreshToken = jwt.sign(
        {
            id: this._id,
            fullname: this.fullname,
            username: this.username
        },

        process.env.REFRESH_TOKEN_SECRET_KEY,

        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        },
    );

    return refreshToken;
};

export const User = mongoose.model("User", userSchema);
