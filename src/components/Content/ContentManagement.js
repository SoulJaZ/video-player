import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiClient from "../../apiClient";
import "../../ContentManagement.css";

const ContentManagement = () => {
  const [contents, setContents] = useState([]);
  const [currentContent, setCurrentContent] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const response = await apiClient.get("/contenidos");
      setContents(response.data);
      toast.success("Contenidos cargados correctamente.");
    } catch (err) {
      setError("Error al cargar los contenidos.");
      toast.error("No se pudieron cargar los contenidos.");
    }
  };

  const handleEditContent = async () => {
    try {
      const updatedContent = { ...currentContent };
      if (updatedContent.horario) {
        const date = new Date(updatedContent.horario);
        updatedContent.horario = date.toISOString().slice(0, 19).replace("T", " ");
      }
      const response = await apiClient.put(`/contenidos/${updatedContent.id_contenido}`, updatedContent);
      setContents(contents.map((content) =>
        content.id_contenido === updatedContent.id_contenido ? response.data : content
      ));
      setCurrentContent({});
      toast.success("El contenido se actualizó correctamente.");
    } catch (err) {
      setError("Error al actualizar el contenido.");
      toast.error("No se pudo actualizar el contenido.");
    }
  };

  const handleDeleteContent = async (id) => {
    try {
      await apiClient.delete(`/contenidos/${id}`);
      setContents(contents.filter((content) => content.id_contenido !== id));
      toast.success("Contenido eliminado correctamente.");
    } catch (err) {
      toast.error("Error al eliminar el contenido.");
      console.error(err);
    }
  };

  return (
    <div className="content-management">
      <ToastContainer />
      <header className="header">
        <h1>Gestión de Contenidos</h1>
      </header>

      {error && <div className="alert alert-error">{error}</div>}

      <section className="existing-content">
        <h2>Contenido Existente</h2>
        <ul className="content-list">
          {contents.map((content) => (
            <li key={content.id_contenido} className="content-item">
              <article>
                <h3>{content.titulo}</h3>
                <p>Tipo: {content.tipo}</p>
                <p>
                  URL:{" "}
                  <a
                    href={content.url_contenido}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content.url_contenido}
                  </a>
                </p>
                <div className="buttons">
                  <button
                    className="btn btn-edit"
                    onClick={() => setCurrentContent(content)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDeleteContent(content.id_contenido)}
                  >
                    Eliminar
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>

      {currentContent.id_contenido && (
        <section className="edit-content">
          <h2>Editar Contenido</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleEditContent(); }}>
            <div className="form-group">
              <label htmlFor="titulo">Título</label>
              <input
                id="titulo"
                type="text"
                placeholder="Título"
                value={currentContent.titulo || ""}
                onChange={(e) =>
                  setCurrentContent({ ...currentContent, titulo: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="tipo">Tipo (VT, VBL, BT)</label>
              <input
                id="tipo"
                type="text"
                placeholder="Tipo"
                value={currentContent.tipo || ""}
                onChange={(e) =>
                  setCurrentContent({ ...currentContent, tipo: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="url">URL del contenido</label>
              <input
                id="url"
                type="text"
                placeholder="URL del contenido"
                value={currentContent.url_contenido || ""}
                onChange={(e) =>
                  setCurrentContent({
                    ...currentContent,
                    url_contenido: e.target.value,
                  })
                }
              />
            </div>
            <button type="submit" className="btn btn-submit">
              Actualizar
            </button>
          </form>
        </section>
      )}
    </div>
  );
};

export default ContentManagement;
