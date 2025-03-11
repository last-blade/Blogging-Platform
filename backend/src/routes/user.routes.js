import { Router } from "express";
import { registerUser } from "../controllers/userControllers/registerUser.controller.js";
import { loginUser } from "../controllers/userControllers/loginUser.controller.js";
import { authentication } from "../middlewares/authentication.middleware.js";
import { logoutUser } from "../controllers/userControllers/logoutUser.controller.js";
import { updateName } from "../controllers/userControllers/updateName.controller.js";
import { updateEmail } from "../controllers/userControllers/updateEmail.controller.js";
import { sendOTP } from "../controllers/userControllers/sendOTP.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(authentication, logoutUser);
router.route("/send-otp").post(sendOTP);

//Update controllers
router.route("/update-fullname").patch(authentication, updateName);
router.route("/update-email").patch(authentication, updateEmail);

export default router;