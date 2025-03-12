import { Router } from "express";
import { authentication } from "../middlewares/authentication.middleware.js";
import { createBlog } from "../controllers/blogControllers/createBlog.controller.js";
import { fetchBlog } from "../controllers/blogControllers/fetchBlog.controllers.js";
import { fetchAllUsersBlogs } from "../controllers/blogControllers/fetchAllUsersBlogs.controller.js";
import { editBlog } from "../controllers/blogControllers/editBlog.controller.js";

const router = Router();

router.route("/create-blog").post(authentication, createBlog);
router.route("/fetch-blog").get(authentication, fetchBlog);
router.route("/fetch-all-blogs").get(fetchAllUsersBlogs);

//update routes
router.route("/edit-blog").patch(authentication, editBlog);

export default router;