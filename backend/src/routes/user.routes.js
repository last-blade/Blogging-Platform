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

//Resetting Password
router.route("/send-forgot-password-otp").post(sendForgotPasswordOTP);
router.route("/verify-forgot-password-otp").post(verifyForgotPasswordOTP);
router.route("/forgot-password").patch(forgotPassword);
router.route("/change-password").patch(authentication, changePassword);

export default router;