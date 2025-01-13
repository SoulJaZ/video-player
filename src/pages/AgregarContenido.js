// AddContent.js
import { useState } from 'react';
import axios from 'axios';

const AddContent = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/contenidos', {
        title,
        body,
      });
      console.log('Contenido agregado:', response.data);
      // Redirigir o mostrar un mensaje de éxito
    } catch (err) {
      setError('Hubo un error al agregar el contenido.');
    }
  };

  return (
    <div>
      <h2>Agregar Contenido</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Cuerpo"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <button type="submit">Agregar</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AddContent;
