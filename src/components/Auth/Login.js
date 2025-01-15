import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../Login.css"; // CSS personalizado para Login

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        login(response.data.user, response.data.token);
        navigate("/home");
      } else {
        setError("No se pudo iniciar sesión.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Hubo un error");
    }
  };

  return (
    <div className="login-container">
      
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
        <h2 className="login-title">Iniciar sesión</h2>
          <label htmlFor="email" className="input-label">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password" className="input-label">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <button type="submit" className="submit-btn">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
