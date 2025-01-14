import React, { useState } from "react";
// import axios from "axios";
import { Link } from "react-router-dom";
import ProgramationList from "./ProgramationList";
import '../../ManageProgramation.css'
// import apiClient from "../../apiClient";

const ManageProgramations = () => {
  const [programaciones] = useState([]);

 

  return (
    <div>
      <h1>Programaciones</h1>
      <ul>
        {programaciones.map((programacion) => (
          <li key={programacion.id_programacion}>
            {programacion.hora_inicio} - {programacion.estado}
          </li>
        ))}
      </ul>
      <button>
          <Link to="/programaciones/crear">
            Crear Programación
          </Link>
        </button>
        <button>
          <Link to="/programaciones/editar">
            Editar Programación
          </Link>
        </button>
        <ProgramationList />

    </div>
  );
};

export default ManageProgramations;
