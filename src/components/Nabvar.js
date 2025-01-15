import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../NavBar.css"; // Importa los estilos aquí

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="logo">
          <strong>MiAplicación</strong>
        </Link>
      </div>
      <div className="link-container">
        {user ? (
          <>
            <Link to="/home" className="nav-link">
              Inicio
            </Link>
            <Link to="/dashboard" className="nav-link">
              Panel
            </Link>
            <Link to="/programaciones" className="nav-link">
              Programaciones
            </Link>
            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Iniciar sesión
            </Link>
            <Link to="/register" className="nav-link">
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
