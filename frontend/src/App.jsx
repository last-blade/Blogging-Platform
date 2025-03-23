import React, { useEffect, useState } from 'react'
import { blogApi } from './apiService/apiService'
import Home from './pages/Home/Home';

function App() {
  // const [blogs, setBlogs] = useState([]);

  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     try {
  //       const res = await blogApi.fetchAllBlogs();
  //       console.log("data", res.data)
  //       setBlogs(res.data.data);
  //     } catch (error) {
  //       console.error("Error fetching blogs:", error);
  //     }
  //   }
  //   fetchBlogs();
  // }, [])

  return (
    <div>
      <Home />
    </div>
  )
}

export default App