import React, { useEffect, useState } from "react";
import apiClient from "../../apiClient";
import "../../ContentList.css"; // CSS personalizado para ContentList

const ContentList = () => {
  const [contents, setContents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await apiClient.get("/contenidos");
        setContents(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error al cargar contenidos");
      }
    };

    fetchContents();
  }, []);

  const renderContent = (content) => {
    const { url_contenido, tipo, titulo } = content;

    // Manejar contenido de tipo "VT" (Video con Título)
    if (tipo === "VT" && url_contenido.includes("youtube")) {
      const videoId = url_contenido.split("v=")[1]?.split("&")[0];
      return (
        <div className="content-item news-card">
          <h3 className="content-title">{titulo}</h3>
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={titulo}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="video-frame"
          ></iframe>
        </div>
      );
    }

    // Manejar contenido de tipo "VBL" (Video con Banner Lateral)
    if (tipo === "VBL" && url_contenido.includes("youtube")) {
      const videoId = url_contenido.split("v=")[1]?.split("&")[0];
      return (
        <div className="content-item news-card news-flex">
          <iframe
            width="70%"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={titulo}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="video-frame"
          ></iframe>
          <div className="banner-container">
            <h3 className="content-title">{titulo}</h3>
            <p className="banner-description">Banner Lateral</p>
            <img src={url_contenido} alt="Banner Lateral" className="banner-image" />
          </div>
        </div>
      );
    }

    // Manejar contenido de tipo "BT" (Banner con Título)
    if (tipo === "BT") {
      return (
        <div className="content-item news-card">
          <h3 className="content-title">{titulo}</h3>
          <img src={url_contenido} alt="Banner" className="banner-image" />
        </div>
      );
    }

    return <p className="content-error">Tipo de contenido no soportado.</p>;
  };

  return (
    <div className="content-list-container">
      <h1 className="content-list-title">Últimas Noticias</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="content-grid">
        {contents.map((content) => (
          <div className="content-row" key={content.id_contenido}>
            <div className="content-column">
              {renderContent(content)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentList;
