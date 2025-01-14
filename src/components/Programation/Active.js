// src/components/Programation/ProgramacionesActivas.js
import React from "react";

const ProgramacionesActivas = ({ programaciones }) => {
  return (
    <div>
      <h2>Programaciones Activas</h2>
      <ul>
        {programaciones
          .filter((programacion) => programacion.estado === "PENDIENTE")
          .map((programacion) => (
            <li key={programacion.id_programacion}>
              <h3>{programacion.titulo}</h3>
              <p>{programacion.hora_inicio}</p>
              <p>{programacion.estado}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProgramacionesActivas;
