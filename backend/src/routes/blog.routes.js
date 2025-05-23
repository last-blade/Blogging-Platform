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
import { getCategorizedBlogsCount } from "../controllers/blogControllers/getCategorizedBlogsCount.controller.js";
import { getBlogsByCategory } from "../controllers/blogControllers/getBlogsByCategory.controller.js";
import { fetchSavedBlogs } from "../controllers/blogControllers/fetchSavedBlogs.controller.js";
import { trendingTopics } from "../controllers/blogControllers/trendingTopics.controller.js";

const router = Router();

//Create Routes
router.route("/create-blog").post(authentication, createBlog);

//Fetch Routes
router.route("/fetch-user-blogs").get(authentication, fetchBlog);
router.route("/fetch-all-blogs").get(fetchAllUsersBlogs);
router.route("/view-blog/:blogId").post(authentication, viewBlog);
router.route("/total-blogs").get(authentication, getTotalBlogsCount);
router.route("/blogs/:category").get(getBlogsByCategory);
router.route("/blogs-category-count").get(getCategorizedBlogsCount);
router.route("/saved-blogs").get(authentication, fetchSavedBlogs);
router.route("/trending-topics").get(trendingTopics)

//Like Routes
router.route("/like-blog/:blogId").post(authentication, likeBlog);
router.route("/get-total-likes-and-who-liked-blog/:blogId").get(getTotalLikesAndWhoLikedBlog);

//Update Routes
router.route("/edit-blog/:blogId").patch(authentication, editBlog);

//Delete Routes
router.route("/delete-blog/:blogId").delete(authentication, deleteBlog)

export default router;