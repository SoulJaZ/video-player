import React, { useState } from "react";
import apiClient from "../../apiClient";
import "../../CreateContent.css";


const CreateContent = () => {
  const [form, setForm] = useState({
    tipo: "VT", // Valor predeterminado: Video con Título
    titulo: "",
    url_contenido: "",
    duracion: "",
    horario: "", // Asegúrate de que este campo esté en el estado
    imagenBanner: null,  // Para VBL
    textoBanner: "",     // Para VBL
  });
  //const [content, setContent] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convertir el valor de horario a un formato ISO válido
        const validHorario = new Date(form.horario).toISOString().slice(0, 19).replace('T', ' ');

      const contentData = new FormData();
      contentData.append("tipo", form.tipo);
      contentData.append("titulo", form.titulo);
      contentData.append("url_contenido", form.url_contenido);
      contentData.append("duracion", form.duracion);
      contentData.append("horario", validHorario); // Enviar el horario
      console.log('Fecha convertida:', validHorario); // Verifica que el formato sea correcto
      if (form.imagenBanner) contentData.append("imagenBanner", form.imagenBanner);
      contentData.append("textoBanner", form.textoBanner);

      // Enviar los datos al backend
      const response = await apiClient.post("/contenidos", contentData);
    

      //setContent(response.data);  // Guarda el contenido creado para su visualización
      alert("Contenido creado con éxito");
      setForm({
        tipo: "VT", 
        titulo: "",
        url_contenido: "",
        duracion: "",
        horario: "",
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
    <div>
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
      {(form.tipo === 'VBL' || form.tipo === 'VT') &&(
        <>
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
      </>
      )}
      
      {/* Condiciones para Video con Banner Lateral (VBL) */}
      {(form.tipo === "BT" || form.tipo === "VBL") && (
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
      {(form.tipo === "BT" || form.tipo === "VBL" || form.tipo === "VT") && (
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

      {/* Botón de Enviar */}
      <div className="form-group">
        <button type="submit" className="submit-button">
          Crear Contenido
        </button>
      </div>
    </form>
    {/* cuando se haya creado, mostrarlo.*/}
    
    </div>
  );
};

export default CreateContent;
