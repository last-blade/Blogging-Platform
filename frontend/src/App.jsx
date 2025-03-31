// src/App.jsx
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { motion } from "framer-motion";
import HomeLayout from './layouts/Home/HomeLayout'; 
import Logo from './components/Logo';
import Explore from './pages/Home/Explore';
const Home = lazy(() => import('./pages/Home/Home'));
const Login = lazy(() => import("./pages/Auth/Login"))
const Register  = lazy(() => import("./pages/Auth/Register"));
const UserDashboard = lazy(() => import("./layouts/Dashboard/UserDashboard"));
const UserHome = lazy(() => import("./pages/Home/UserHome"));
const VerifyOTP = lazy(() => import("./pages/Auth/VerifyOTP"));
const BlogEditorPage = lazy(() => import("./layouts/Dashboard/BlogEditorPage"));

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Logo />
            </motion.div>
          </div>
        }
      >
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
          <Route path="/signup" element={<Register />} />
          <Route
            path="/home"
            element={
              <UserDashboard>
                <UserHome />
              </UserDashboard>
            }
          />

          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/blog-editor" element={<BlogEditorPage />} />
          <Route path="/explore" element={
            <HomeLayout>
              <Explore />
            </HomeLayout>
          }/>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
