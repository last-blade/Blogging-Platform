import { Blog } from "../../models/blog.model.js";
import { apiError, apiResponse, asyncHandler, User } from "../allImports.js";


const fetchBlog = asyncHandler(async (request, response) => {
    /*
        -- sabse pehle user ko find karunga 
        -- user documnet se "blog" ki Id nikalunga
        -- fir iss blog ki id ko "Blog" collection i.e. database mein find karunga
        -- agar find ho gaya toh theek hai nahin toh fir error send kar denge
    */
   const user = request.user;
   const userId = user.id;

   const foundUser = await User.findById(userId);

   if(!foundUser){
    throw new apiError(400, "You need to login first.")
   }

   const blogIds = foundUser.blog;

   const fetchedBlogs = await Blog.find({_id: {$in: blogIds}});

   if(!fetchBlog.length){
    throw new apiError(404, "No Blogs Found")
   }

   return response.status(200)
   .json(new apiResponse(200, fetchedBlogs, "Blogs fetched successfully."))

});

export {fetchBlog}