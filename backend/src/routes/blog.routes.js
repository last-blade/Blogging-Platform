import { Router } from "express";
import { authentication } from "../middlewares/authentication.middleware.js";
import { createBlog } from "../controllers/blogControllers/createBlog.controller.js";
import { fetchBlog } from "../controllers/blogControllers/fetchBlog.controllers.js";
import { fetchAllUsersBlogs } from "../controllers/blogControllers/fetchAllUsersBlogs.controller.js";
import { editBlog } from "../controllers/blogControllers/editBlog.controller.js";
import { likeBlog } from "../controllers/blogControllers/likeBlog.controller.js";
import { getTotalLikesAndWhoLikedBlog } from "../controllers/blogControllers/getTotalLikesAndWhoLikedBlog.controller.js";

const router = Router();

router.route("/create-blog").post(authentication, createBlog);
router.route("/fetch-blog").get(authentication, fetchBlog);
router.route("/fetch-all-blogs").get(fetchAllUsersBlogs);
router.route("/like-blog").post(authentication, likeBlog);
router.route("/get-total-likes-and-who-liked-blog").get(getTotalLikesAndWhoLikedBlog);

//update routes
router.route("/edit-blog").patch(authentication, editBlog);

export default router;