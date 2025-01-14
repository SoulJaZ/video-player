import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../Home.css'; // CSS personalizado para Home

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);



  return (
    <div className="home-container">
      <h1 className="welcome-message">Bienvenido, {user?.nombre}</h1>
    </div>
  );
};

export default Home;
