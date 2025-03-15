import { Router } from "express";
import { authentication } from "../middlewares/authentication.middleware.js";
import { createComment } from "../controllers/commentControllers/createComment.controller.js";
import { fetchComments } from "../controllers/commentControllers/fetchComments.controller.js";
import { getTotalLikesAndWhoLikedComment } from "../controllers/commentControllers/getTotalLikesAndWhoLikedComment.controller.js";
import { likeComment } from "../controllers/commentControllers/likeComment.controller.js";

const router = Router();

router.route("/create-comment").post(authentication, createComment);
router.route("/fetch-comments").get(fetchComments);
router.route("/get-total-likes-and-who-liked").get(getTotalLikesAndWhoLikedComment);
router.route("like-comment").post(authentication, likeComment);

export default router;