import React, { useEffect, useState } from "react";
import apiClient from "../../apiClient";
import '../../ContentList.css'; // CSS personalizado para ContentList

const ContentList = () => {
  const [contents, setContents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await apiClient.get("/contenidos");
        setContents(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error al cargar contenidos");
      }
    };

    fetchContents();
  }, []);

  return (
    <div className="content-list-container">
      <h1>Lista de Contenidos</h1>
      {error && <p className="error-message">{error}</p>}
      <table className="content-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Tipo</th>
            <th>Duración</th>
          </tr>
        </thead>
        <tbody>
          {contents.map((content) => (
            <tr key={content.id_contenido}>
              <td>{content.titulo}</td>
              <td>{content.tipo}</td>
              <td>{content.duracion} minutos</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContentList;
