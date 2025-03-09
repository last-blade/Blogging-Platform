import { User } from "../../models/user.model.js";
import { apiError, apiResponse, asyncHandler } from "../allImports.js";

const registerUser = asyncHandler(async (request, response) => {
    const {fullname, username, password, email, avatar} = request.body;
    
    if([!fullname, !username, !password, !email].some((inputField) => inputField.trim === "")){
        throw new apiError(404, "All fields are required")
    }

    const foundUser = await User.findOne({
        $or: [{email}, {username}]
    });

    if(foundUser){
        throw new apiError(400, "User with this email or username already exists.")
    }

    const createdUser = await User.create({
        fullname,
        username: username.toLowerCase(),
        email,
        password,
    });

    const user = await User.findById(createdUser._id).select("-password -refreshToken");

    if(!user){
        throw new apiError(500, "Something went wrong, please try again!")
    }

    return response.status(200).json(
        new apiResponse(200, user, "User registered successfully.")
    );

});

export {registerUser}