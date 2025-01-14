// AdminDashboard.js
import React from "react";

import CreateContent from "../components/Content/CreateContent";
import ContentList from "../components/Content/ContentList";

const AdminDashboard = () => {
  return (
    <div>
      <h1>Panel de Administración</h1>
      <CreateContent />
      <ContentList />
      
    </div>
  );
};
export default AdminDashboard;
