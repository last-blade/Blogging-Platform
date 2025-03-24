// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeLayout from './layouts/Home/HomeLayout'; 
import Home from './pages/Home/Home';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page with HomeLayout */}
        <Route 
          path="/" 
          element={
            <HomeLayout>
              <Home />
            </HomeLayout>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
