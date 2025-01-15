import React from "react";
import { ToastContainer } from "react-toastify"; // Importa ToastContainer para notificaciones
import "react-toastify/dist/ReactToastify.css"; // Asegúrate de incluir los estilos
import '../../ManageProgramation.css'

import ContentList from "../../components/Content/ContentList";
import ContentManagement from "../Content/ContentManagement";

const ManageProgramations = () => {
  return (
    <div className="manage-programations-container">
      {/* Contenedor principal */}
      <ToastContainer /> {/* Contenedor para notificaciones */}
      
      <header className="dashboard-header">
        <h1>Panel de Gestión de Contenidos</h1>
        <p>Administra y actualiza tus contenidos de manera sencilla.</p>
      </header>
      
      <main className="dashboard-content">
        {/* Lista de contenidos */}
        <section className="content-list-section">
          <h2>Lista de Contenidos</h2>
          <ContentList />
        </section>

        {/* Gestión de contenidos */}
        <section className="content-management-section">
          <h2>Gestión de Contenidos</h2>
          <ContentManagement />
        </section>
      </main>
    </div>
  );
};

export default ManageProgramations;
