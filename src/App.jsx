import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// SYSTEM GLOBAL VECTORS
import Navbar from './components/Navbar';
import Background from './components/Background';

// PLATFORM PAGES COHORTS
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Internships from './pages/Internships';
import Login from './pages/Login';
import Register from './pages/Register';
import HtmlCourse from './pages/HtmlCourse';
import CssCourse from './pages/CssCourse';

// 🚨 RE-IMPORTING MISSING ADMIN PORTAL COMPONENT MODULES
import AdminDashboard from './pages/Admin'; // Agar file ka naam Admin ya AdminDashboard hai toh verify kar lena bhai!

export default function App() {
  return (
    <Router>
      {/* Universal Portfolio-Glass Background Engine */}
      <Background />

      {/* Global Interface Navigation */}
      <Navbar />

      {/* 🚀 STABLE ROUTING SYSTEM PLATFORM CORE */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/course/html" element={<HtmlCourse />} />
        <Route path="/course/css" element={<CssCourse />} />

        {/* 🚨 THE RESTORED ADMIN CORE GATEWAY ENDPOINT */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Universal Fallback Vector Protection (Handles unknown slugs safely) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}