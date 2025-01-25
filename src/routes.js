import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FacultyDashboard from "./pages/FacultyDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/faculty-dashboard" element={
                        <ProtectedRoute role="faculty">
                            <FacultyDashboard />
                        </ProtectedRoute>
                        } />
                <Route path="/student-dashboard" element={
                        <ProtectedRoute role="student">
                            <StudentDashboard />
                        </ProtectedRoute>
                        } />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
