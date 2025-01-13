// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import '../NavBar.css'; // Importa los estilos aquí

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav>
      <div>
        <Link to="/" className="logo">
          <strong>MiAplicación</strong>
        </Link>
        
      </div>
      <div className="link-container">
          
        {user ? (
          <>
            <Link to="/home" className="link">
              Inicio
            </Link>
            <Link to="/dashboard" className="link">
              Panel
            </Link>
            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link to="/login" className="link">
            Iniciar sesión
          </Link>
        )}
        <Link to="/register" className="link">
            Registrarse
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
