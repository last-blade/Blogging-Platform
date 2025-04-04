import { Router } from "express";
import { registerUser } from "../controllers/userControllers/registerUser.controller.js";
import { loginUser } from "../controllers/userControllers/loginUser.controller.js";
import { authentication } from "../middlewares/authentication.middleware.js";
import { logoutUser } from "../controllers/userControllers/logoutUser.controller.js";
import { updateName } from "../controllers/userControllers/updateName.controller.js";
import { updateEmail } from "../controllers/userControllers/updateEmail.controller.js";
import { sendOTP } from "../controllers/userControllers/sendOTP.controller.js";
import { verifyOTP } from "../controllers/userControllers/verifyOTP.controller.js";
import { updateUsername } from "../controllers/userControllers/updateUsername.controller.js";
import { sendForgotPasswordOTP } from "../controllers/userControllers/sendForgotPasswordOTP.controller.js";
import { forgotPassword } from "../controllers/userControllers/forgotPassword.controller.js";
import { verifyForgotPasswordOTP } from "../controllers/userControllers/verifyForgotPasswordOTP .controller.js";
import { changePassword } from "../controllers/userControllers/changePassord.controller.js";
import { getTotalFollwers } from "../controllers/userControllers/getTotalFollowers.controller.js";
import { follow } from "../controllers/userControllers/follow.controller.js";
import { saveBlog } from "../controllers/userControllers/saveBlog.controller.js";
import { getTopBloggers } from "../controllers/userControllers/getTopBloggers.controller.js";
import { getTotalFollowing } from "../controllers/userControllers/getTotalFollowing.controller.js";
import { getTotalViewsOfAllBlogs } from "../controllers/userControllers/getTotalViewsOfAllBlogs.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(authentication, logoutUser);

//OTP Routes
router.route("/send-otp").post(sendOTP);
router.route("/verify-otp").post(verifyOTP);

//Update Routes
router.route("/update-fullname").patch(authentication, updateName);
router.route("/update-email").patch(authentication, updateEmail);
router.route("/update-username").patch(authentication, updateUsername);

//Resetting Passowrd Routes
router.route("/send-forgot-password-otp").post(sendForgotPasswordOTP);
router.route("/verify-forgot-password-otp").post(verifyForgotPasswordOTP);
router.route("/forgot-password").patch(forgotPassword);
router.route("/change-password").patch(authentication, changePassword);

//Followers Routes
router.route("/follow/:whomToFollowUserId").post(authentication, follow);
router.route("/get-total-followers/:userId").get(getTotalFollwers);
router.route("/total-followings/:randomUserId?").get(authentication, getTotalFollowing)

//Blog Routes
router.route("/save-blog/:blogId").post(authentication, saveBlog);
router.route("/top-bloggers").get(getTopBloggers);
router.route("/all-blogs-views").get(authentication, getTotalViewsOfAllBlogs)

export default router;