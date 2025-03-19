import API from "./axiosInstance";

//Create Blog
export const createBlog = async (blogData) => API.post("blog/create-blog", blogData);

//Fetch User's Blogs
export const fetchUserBlogs = async () => API.get("blog/fetch-user-blogs");

//Fetch All Blogs
export const fetchAllBlogs = async () => API.get("blog/fetch-all-blogs");

//View Single Blog
export const viewBlog = async (blogId) => API.get(`blog/view-blog/${blogId}`);

//Like Blog
export const likeBlog = async (blogId) => API.post(`blog/like-blog/${blogId}`);

//Get Blog Likes & Who Liked
export const getBlogLikes = async (blogId) => API.get(`blog/get-total-likes-and-who-liked-blog/${blogId}`);

//Edit Blog
export const editBlog = async (blogId, updatedData) => API.patch(`blog/edit-blog/${blogId}`, updatedData);

//Delete Blog
export const deleteBlog = async (blogId) => API.delete(`blog/delete-blog/${blogId}`);
