// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeLayout from './layouts/Home/HomeLayout'; 
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import UserDashboard from './layouts/Dashboard/UserDashboard';
import UserHome from './pages/Home/UserHome';
import VerifyOTP from './pages/Auth/VerifyOTP';

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

        <Route path='verify-otp' element={<VerifyOTP />} />
      </Routes>
    </Router>
  );
}

export default App;
