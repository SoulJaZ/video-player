// src/components/Programation/EditarProgramacion.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditarProgramacion = ({ setIsEditMode }) => {
  const [horaInicio, setHoraInicio] = useState("");
  const [contenidoId, setContenidoId] = useState("");
  const [estado, setEstado] = useState("PENDIENTE");
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar datos de la programación seleccionada
    // Supongamos que tienes un ID de programación en la URL
    const programacionId = 1; // Aquí puedes obtenerlo de la URL o el estado

    fetch(`/api/programaciones/${programacionId}`)
      .then((response) => response.json())
      .then((data) => {
        setHoraInicio(data.hora_inicio);
        setContenidoId(data.contenido_id);
        setEstado(data.estado);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProgramacion = { horaInicio, contenidoId, estado };

    const response = await fetch("/api/programaciones/1", { // Usar el ID adecuado
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProgramacion),
    });

    if (response.ok) {
      setIsEditMode(false); // Salir del modo de edición
      navigate("/programaciones"); // Redirigir a la página de gestión
    } else {
      console.error("Error al editar la programación");
    }
  };

  return (
    <div>
      <h2>Editar Programación</h2>
      <form onSubmit={handleSubmit}>
        <label>Hora de Inicio</label>
        <input
          type="datetime-local"
          value={horaInicio}
          onChange={(e) => setHoraInicio(e.target.value)}
          required
        />

        <label>Contenido</label>
        <select
          value={contenidoId}
          onChange={(e) => setContenidoId(e.target.value)}
          required
        >
          {/* Aquí deberías cargar los contenidos disponibles desde la API */}
          <option value="">Seleccionar Contenido</option>
        </select>

        <label>Estado</label>
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          required
        >
          <option value="PENDIENTE">Pendiente</option>
          <option value="EJECUTADO">Ejecutado</option>
        </select>

        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default EditarProgramacion;
