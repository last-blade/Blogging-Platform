import { User } from "../../models/user.model.js";
import { sendMail } from "../../utils/sendEmail.js";
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

    const subject = "Welcome to PixelPen – Your Journey Begins!✒️";
    const emailBody = `
        <p>Dear <strong>${fullname}</strong>,</p>
        <p>We’re thrilled to welcome you to <strong>PixelPen</strong>, where your words can inspire the world! Your account has been successfully created, and you’re now part of a community of passionate writers and readers.</p>
        <p><strong>Your account details:</strong></p>
        <ul>
            <li><strong>Username:</strong> ${username}</li>
            <li><strong>Email:</strong> ${email}</li>
        </ul>
        <p>Start crafting your first blog and share your ideas with the world!</p>
        <p>If you did not sign up for this account, please contact our support team immediately.</p>
        <p>Happy writing!<br><strong>Team PixelPen</strong></p>
    `;

    await sendMail(email, subject, emailBody);

    return response.status(200).json(
        new apiResponse(200, user, "User registered successfully.")
    );

});

export {registerUser}