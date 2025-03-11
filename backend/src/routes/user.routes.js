import { Router } from "express";
import { registerUser } from "../controllers/userControllers/registerUser.controller.js";
import { loginUser } from "../controllers/userControllers/loginUser.controller.js";
<<<<<<< HEAD
=======
import { authentication } from "../middlewares/authentication.middleware.js";
import { logoutUser } from "../controllers/userControllers/logoutUser.controller.js";
import { updateName } from "../controllers/userControllers/updateName.controller.js";
import { updateEmail } from "../controllers/userControllers/updateEmail.controller.js";
>>>>>>> 267147d6eed4b7b772504f6b39477461ba23f3d4

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
<<<<<<< HEAD
=======
router.route("/logout").post(authentication, logoutUser);

//Update controllers
router.route("/update-fullname").patch(authentication, updateName);
router.route("/update-email").patch(authentication, updateEmail);
>>>>>>> 267147d6eed4b7b772504f6b39477461ba23f3d4

export default router;