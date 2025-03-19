import React, { useEffect, useState } from 'react'
import { blogApi } from './apiService/apiService'

function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await blogApi.fetchAllBlogs();
        console.log("data", res.data)
        setBlogs(res.data.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }
    fetchBlogs();
  }, [])

  return (
    <div className='text-red-600 pt-3'>
      <h1>All Blogs</h1>
      {blogs.map((blog) => (
        <div key={blog.id}>{blog.blogName}</div>
      ))}
    </div>
  )
}

export default App