import { Router } from "express";
import { authentication } from "../middlewares/authentication.middleware.js";
import { createBlog } from "../controllers/blogControllers/createBlog.controller.js";

const router = Router();

router.route("/create-blog").post(authentication, createBlog);

export default router;