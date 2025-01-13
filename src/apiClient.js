import axios from "axios";

// Crear instancia base de axios
const apiClient = axios.create({
  baseURL: "http://localhost:5000/api", // Cambia esto al dominio del backend en producción
  headers: {
    "Content-Type": "application/json",
  },
});

// Agregar el token en las solicitudes automáticamente
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Obtener token del almacenamiento local
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
