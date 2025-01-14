import React, { useEffect, useState } from "react";
import apiClient from "../../apiClient";
import '../../Programation.css'; // CSS personalizado para ProgramationList

const ProgramationList = () => {
  const [programaciones, setProgramaciones] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgramaciones = async () => {
      try {
        const response = await apiClient.get("/programaciones");
        setProgramaciones(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error al cargar las programaciones");
      }
    };

    fetchProgramaciones();
  }, []);

  return (
    <div className="programation-list-container">
      <h1>Lista de Programaciones</h1>
      {error && <p className="error-message">{error}</p>}
      <table className="programation-table">
        <thead>
          <tr>
            <th>Hora de Inicio</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {programaciones.map((programacion) => (
            <tr key={programacion.id_programacion}>
              <td>{programacion.hora_inicio}</td>
              <td>{programacion.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProgramationList;
