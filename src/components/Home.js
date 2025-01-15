import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiClient from '../apiClient';  // Asegúrate de que apiClient esté configurado correctamente.
import '../Home.css'; // CSS personalizado para Home

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [content, setContent] = useState(null);

  // Obtener el contenido más reciente
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await apiClient.get("/contenidos");
        if (response.data && response.data.length > 0) {
          // Suponiendo que la API devuelve una lista, seleccionamos el primer elemento
          setContent(response.data[0]); 
        }
      } catch (err) {
        console.log(err.response?.data?.message || "Error al cargar contenidos");
      }
    };

    fetchContent();
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="home-container">
      <h1>Bienvenido a la Proyección de Contenido</h1>
      {content ? (
        <div className="banner-container">
          <h2>{content.titulo}</h2>
          <div className="banner-content">
            <img src={content.url_contenido} alt="Contenido" className="banner-image" />
            <div className="banner-details">
              <p>{content.textoBanner}</p>
              <p><strong>Duración:</strong> {content.duracion} segundos</p>
              <p><strong>Horario:</strong> {new Date(content.horario).toLocaleString()}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Cargando contenido más reciente...</p>
      )}
    </div>
  );
};

export default Home;
