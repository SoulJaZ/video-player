import React, { useEffect, useState } from 'react';
import { getProfile } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const profileData = await getProfile(token);
        setProfile(profileData);
      } catch (err) {
        setError('Error al obtener el perfil');
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  return (
    <div>
      <h2>Perfil</h2>
      {error && <p>{error}</p>}
      {profile ? (
        <div>
          <p><strong>Nombre:</strong> {profile.nombre}</p>
          <p><strong>Email:</strong> {profile.email}</p>
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
    </div>
  );
};

export default Profile;
