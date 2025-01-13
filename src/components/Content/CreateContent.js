import React, { useState } from "react";
import apiClient from "../../apiClient";
import "../../CreateContent.css"

const CreateContent = () => {
  const [form, setForm] = useState({
    tipo: "VT", // Valor predeterminado: Video con Título
    titulo: "",
    url_contenido: "",
    duracion: "",
    imagenBanner: null,  // Para VBL
    textoBanner: "",     // Para VBL
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const contentData = new FormData();
      contentData.append("tipo", form.tipo);
      contentData.append("titulo", form.titulo);
      contentData.append("url_contenido", form.url_contenido);
      contentData.append("duracion", form.duracion);
      if (form.imagenBanner) contentData.append("imagenBanner", form.imagenBanner);
      contentData.append("textoBanner", form.textoBanner);

      // Enviar los datos al backend
      await apiClient.post("/contenidos", contentData);
      alert("Contenido creado con éxito");
      setForm({
        tipo: "VT", 
        titulo: "",
        url_contenido: "",
        duracion: "",
        imagenBanner: null,
        textoBanner: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error al crear contenido");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, imagenBanner: e.target.files[0] });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Agregar Contenido</h2>

      {/* Tipo de Contenido */}
      <div className="form-group">
        <label>Tipo de Contenido:</label>
        <select
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          className="input-field"
        >
          <option value="VT">Video con Título</option>
          <option value="VBL">Video con Banner Lateral</option>
          <option value="BT">Banner con Título</option>
        </select>
      </div>

      {/* Título */}
      <div className="form-group">
        <label>Título:</label>
        <input
          type="text"
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          placeholder="Título"
          className="input-field"
          required
        />
      </div>

      {/* URL del Contenido (Video o Imagen) */}
      <div className="form-group">
        <label>URL del Contenido (Video/Imagen):</label>
        <input
          type="url"
          name="url_contenido"
          value={form.url_contenido}
          onChange={handleChange}
          placeholder="URL"
          className="input-field"
          required
        />
      </div>

      {/* Condiciones para Video con Banner Lateral (VBL) */}
      {(form.tipo === "BT" ||  form.tipo === "VBL" ) &&(
        <>
          <div className="form-group">
            <label>Imagen del Banner Lateral (opcional):</label>
            <input
              type="file"
              name="imagenBanner"
              onChange={handleFileChange}
              className="input-field"
              accept="image/*"
            />
          </div>

          <div className="form-group">
            <label>Texto del Banner Lateral (opcional):</label>
            <input
              type="text"
              name="textoBanner"
              value={form.textoBanner}
              onChange={handleChange}
              placeholder="Texto del banner"
              className="input-field"
            />
          </div>
        </>
      )}

      {/* Condiciones para Banner con Título (BT) */}
      {(form.tipo === "BT" ||  form.tipo === "VBL" || form.tipo === "VT") &&(
        <div className="form-group">
          <label>Duración (en segundos):</label>
          <input
            type="number"
            name="duracion"
            value={form.duracion}
            onChange={handleChange}
            placeholder="Duración"
            className="input-field"
            required
            min={0}
          />
        </div>
      )}

      {/* Botón de Enviar */}
      <div className="form-group">
        <button type="submit" className="submit-button">
          Crear Contenido
        </button>
      </div>
    </form>
  );
};

export default CreateContent;
