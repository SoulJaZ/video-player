// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../src/context/AuthContext";
import Register from "../src/components/Auth/Register";
import Navbar from "../src/components/Nabvar";
import Home from "../src/components/Home";
import Login from "../src/components/Auth/Login";
import AdminDashboard from "../src/pages/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";
import CrearProgramacion from "./components/Programation/CrearProgramacion";
import ManageProgramations from "./components/Programation/ManageProgramation";
import ProgramationList from './components/Programation/ProgramationList'


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}/>
          <Route path="/programaciones/crear" element={<CrearProgramacion />}/>
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/programaciones"
            element={
              <PrivateRoute>
                <ManageProgramations />
              </PrivateRoute>
            }
          />
          <Route
            path="/programaciones"
            element={
              <PrivateRoute>
                <ProgramationList />
              </PrivateRoute>
            }
          />

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
