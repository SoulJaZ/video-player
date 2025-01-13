import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate
import '../../Register.css';


const Register = () => {

    const { login } = useAuth();
    const navigate = useNavigate();  // Instancia para navegar
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [error, setError] = useState('');
    const [rol, setRol] = useState('VIEWER'); // Por defecto, rol 'VIEWER'
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false);

        // Verificar los datos que se envían
        console.log({ email, password, nombre, rol });
    
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', { 
                email, 
                password, 
                nombre, 
                rol 
            });
            console.log('Respuesta completa del servidor:', response.data); // Verifica la respuesta completa
            console.log('Usuario registrado:', response.data.user); // Verifica la respuesta del servidor
            
            // Llama a login con la información del usuario y el token
            login(response.data.user, response.data.token);
            setSuccess(true);
            setTimeout(() => navigate('/home'), 1500);  // Cambia a la ruta que prefieras

        } catch (err) {
            console.error('Error de registro:', err);
            setError(err.response?.data?.message || 'Hubo un error');
        }
    };
    
    return (
        <div className="register-container">
          <div className="register-card">
            <h2 className="register-title">Registrarse</h2>
            {error && <div className="alert error">{error}</div>}
            {success && <div className="alert success">¡Registro exitoso! Redirigiendo...</div>}
            <form onSubmit={handleSubmit} className="register-form">
              <div>
                <input
                  type="text"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className={`register-input ${!nombre && error ? 'input-error' : ''}`}
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`register-input ${!email && error ? 'input-error' : ''}`}
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`register-input ${!password && error ? 'input-error' : ''}`}
                  required
                />
              </div>
              <div>
                <select
                  value={rol}
                  onChange={(e) => setRol(e.target.value)}
                  className="register-select"
                >
                  <option value="VIEWER">Viewer</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <button type="submit" className="register-button">
                Registrarse
              </button>
            </form>
          </div>
        </div>
      );
    };

export default Register;
