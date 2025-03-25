import { Router } from "express";
import { authentication } from "../middlewares/authentication.middleware.js";
import { createBlog } from "../controllers/blogControllers/createBlog.controller.js";
import { fetchBlog } from "../controllers/blogControllers/fetchBlog.controller.js";
import { fetchAllUsersBlogs } from "../controllers/blogControllers/fetchAllUsersBlogs.controller.js";
import { editBlog } from "../controllers/blogControllers/editBlog.controller.js";
import { likeBlog } from "../controllers/blogControllers/likeBlog.controller.js";
import { getTotalLikesAndWhoLikedBlog } from "../controllers/blogControllers/getTotalLikesAndWhoLikedBlog.controller.js";
import { deleteBlog } from "../controllers/blogControllers/deleteBlog.controller.js";
import { viewBlog } from "../controllers/blogControllers/viewBlog.controller.js";
import { getTotalBlogsCount } from "../controllers/blogControllers/getTotalBlogsCount.controller.js";

const router = Router();

//Create Routes
router.route("/create-blog").post(authentication, createBlog);

//Fetch Routes
router.route("/fetch-user-blogs").get(authentication, fetchBlog);
router.route("/fetch-all-blogs").get(fetchAllUsersBlogs);
router.route("/view-blog/:blogId").get(viewBlog);
router.route("/total-blogs").get(authentication, getTotalBlogsCount);

//Like Routes
router.route("/like-blog/:blogId").post(authentication, likeBlog);
router.route("/get-total-likes-and-who-liked-blog/:blogId").get(getTotalLikesAndWhoLikedBlog);

//Update Routes
router.route("/edit-blog/:blogId").patch(authentication, editBlog);

//Delete Routes
router.route("/delete-blog/:blogId").delete(authentication, deleteBlog)

export default router;