// src/App.jsx
import React, { lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeLayout from './layouts/Home/HomeLayout'; 
const Home = lazy(() => import('./pages/Home/Home'));
const Login = lazy(() => import("./pages/Auth/Login"))
const Register  = lazy(() => import("./pages/Auth/Register"));
const UserDashboard = lazy(() => import("./layouts/Dashboard/UserDashboard"));
const UserHome = lazy(() => import("./pages/Home/UserHome"));
const VerifyOTP = lazy(() => import("./pages/Auth/VerifyOTP"));
const BlogEditorPage = lazy(() => import("./layouts/Dashboard/BlogEditorPage"))

function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <HomeLayout>
              <Home />
            </HomeLayout>
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register/>} />
        <Route path="/home" element={
              <UserDashboard>
                <UserHome />
              </UserDashboard>
        } />

        <Route path='/verify-otp' element={<VerifyOTP />} />
        <Route path='/blog-editor' element={<BlogEditorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
