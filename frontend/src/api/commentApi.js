import API from "./axiosInstance";

//Create Comment
export const createComment = async (commentData) => API.post("/create-comment", commentData);

//Fetch Comments
export const fetchComments = async () => API.get("/fetch-comments");

//Like Comment
export const likeComment = async (commentId) => API.post(`/like-comment/${commentId}`);

//Get Comment Likes & Who Liked
export const getCommentLikes = async () => API.get("/get-total-likes-and-who-liked-comment");
