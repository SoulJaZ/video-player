import React, { useState } from "react";
import apiClient from "../../apiClient";
import "../../CreateContent.css";

const CreateSchedule = () => {
  const [form, setForm] = useState({
    contenidoId: "", // ID del contenido a programar
    horario: "", // Fecha y hora de programación
    repeticion: "none", // Tipo de repetición: diaria, semanal, etc.
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const scheduleData = {
        contenidoId: form.contenidoId,
        horario: form.horario,
        repeticion: form.repeticion,
      };
      // Verifica los datos que estás enviando
      console.log("Datos a enviar:", scheduleData);
      // Enviar los datos al backend
      await apiClient.post("/programaciones/crear", scheduleData);
      alert("Programación creada con éxito");

      // Reiniciar formulario
      setForm({
        contenidoId: "",
        horario: "",
        repeticion: "none",
      });
    } catch (err) {
      console.error(err);
      alert("Error al crear programación");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Crear Programación</h2>

      {/* Selección de contenido */}
      <div className="form-group">
        <label>ID del Contenido:</label>
        <input
          type="text"
          name="contenidoId"
          value={form.contenidoId}
          onChange={handleChange}
          placeholder="ID del contenido"
          className="input-field"
          required
        />
      </div>

      {/* Campo para el horario */}
      <div className="form-group">
        <label>Horario de Programación:</label>
        <input
          type="datetime-local"
          name="horario"
          value={form.horario}
          onChange={handleChange}
          className="input-field"
          required
        />
      </div>

      {/* Opciones de repetición */}
      <div className="form-group">
        <label>Repetición:</label>
        <select
          name="repeticion"
          value={form.repeticion}
          onChange={handleChange}
          className="input-field"
        >
          <option value="none">Sin repetición</option>
          <option value="daily">Diaria</option>
          <option value="weekly">Semanal</option>
        </select>
      </div>

      {/* Botón de Enviar */}
      <div className="form-group">
        <button type="submit" className="submit-button">
          Crear Programación
        </button>
      </div>
    </form>
  );
};

export default CreateSchedule;
