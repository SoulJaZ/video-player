//import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from "../src/context/AuthContext";

// Components
import Navbar from "../src/components/Nabvar";
import PrivateRoute from "./components/PrivateRoute";

// Pages
import Home from "../src/components/Home";
import Login from "../src/components/Auth/Login";
import Register from "../src/components/Auth/Register";
import AdminDashboard from "../src/pages/AdminDashboard";
import ManageProgramations from "./components/Programation/ManageProgramation";


// Routes Constant
const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  HOME: "/home",
  DASHBOARD: "/dashboard",
  PROGRAMATIONS: "/programaciones",
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        
        {/* Navbar */}
        <Navbar />

        {/* App Routes */}
        <Routes>
          {/* Public Routes */}
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />

          {/* Private Routes */}
          <Route
            path={ROUTES.HOME}
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.PROGRAMATIONS}
            element={
              <PrivateRoute>
                <ManageProgramations />
              </PrivateRoute>
            }
          />

          {/* Fallback Route */}
         
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
