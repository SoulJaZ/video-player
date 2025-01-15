// AdminDashboard.js
import React from "react";
import '../AdminDashboard.css';
import CreateContent from "../components/Content/CreateContent";
// import ContentList from "../components/Content/ContentList"; // Si necesitas mostrar una lista de contenido, descomenta esta línea.

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <header>
        <h1>Panel de Administración</h1>
      </header>

      {/* Agregar más componentes o información relevante */}
      <section className="content-management">
        <CreateContent />
      </section>

      {/* Puedes agregar una sección para listar contenidos si es necesario */}
      {/* <ContentList /> */}
    </div>
  );
};

export default AdminDashboard;
