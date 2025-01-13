import axios from 'axios';

// Configura axios con la URL base de tu backend
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Cambia esta URL si es necesario
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para registrar un nuevo usuario
export const registerUser = async (data) => {
  try {
    const response = await api.post('/auth/register', data);
    return response.data; // Devuelve los datos de respuesta (por ejemplo, el usuario registrado)
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

// Función para iniciar sesión de un usuario
export const loginUser = async (data) => {
  try {
    const response = await api.post('/auth/login', data);
    return response.data; // Devuelve el token y los datos del usuario
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

// Función para obtener el perfil del usuario autenticado
export const getProfile = async (token) => {
  try {
    const response = await api.get('/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`, // Incluye el token en los headers
      },
    });
    return response.data; // Devuelve los datos del perfil del usuario
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

// Función para cerrar sesión
export const logoutUser = () => {
  // Borra el token almacenado (por ejemplo, en localStorage o en el contexto)
  localStorage.removeItem('authToken');
};
    