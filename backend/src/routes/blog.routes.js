import { Router } from "express";
import { authentication } from "../middlewares/authentication.middleware.js";
import { createBlog } from "../controllers/blogControllers/createBlog.controller.js";
import { fetchBlog } from "../controllers/blogControllers/fetchBlog.controllers.js";
import { fetchAllUsersBlogs } from "../controllers/blogControllers/fetchAllUsersBlogs.controller.js";
import { editBlog } from "../controllers/blogControllers/editBlog.controller.js";
import { likeBlog } from "../controllers/blogControllers/likeBlog.controller.js";
import { getTotalLikesAndWhoLikedBlog } from "../controllers/blogControllers/getTotalLikesAndWhoLikedBlog.controller.js";
import { deleteBlog } from "../controllers/blogControllers/deleteBlog.controller.js";

const router = Router();

router.route("/create-blog").post(authentication, createBlog);
router.route("/fetch-user-blogs").get(authentication, fetchBlog);
router.route("/fetch-all-blogs").get(fetchAllUsersBlogs);
router.route("/like-blog/:blogId").post(authentication, likeBlog);
router.route("/get-total-likes-and-who-liked-blog").get(getTotalLikesAndWhoLikedBlog);

//Update Routes
router.route("/edit-blog/:blogId").patch(authentication, editBlog);

//Delete Routes
router.route("/delete-blog/:blogId").delete(authentication, deleteBlog)

export default router;