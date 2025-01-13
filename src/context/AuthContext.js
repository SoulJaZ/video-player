// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  //const [token, setToken] = useState(localStorage.getItem('token') || '');

  // Almacenamos el token y los datos del usuario en localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");

    // Verifica si el token existe y si es un valor válido
    if (token) {
      try {
        if (token.split(".").length === 3) {
          // Decodificar el token si es válido
          const decodedUser = jwtDecode(token);
          setUser(decodedUser);
        }else {
            console.error("Token inválido: no tiene el formato correcto.");
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    // Guarda el token en localStorage
    localStorage.setItem("token", token); // Guardar token en el localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token"); // Eliminar token del localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
