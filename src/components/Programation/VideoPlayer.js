import React from "react";

const VideoPlayer = (content) => {
  const { url_contenido, tipo, titulo } = content;

  // Manejar contenido de tipo "VT" (Video con Título)
  if (tipo === "VT" && url_contenido.includes("youtube")) {
    const videoId = url_contenido.split("v=")[1]?.split("&")[0];
    return (
      <div>
        <h3>{titulo}</h3>
        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={titulo}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  // Manejar contenido de tipo "VBL" (Video con Banner Lateral)
  if (tipo === "VBL" && url_contenido.includes("youtube")) {
    const videoId = url_contenido.split("v=")[1]?.split("&")[0];
    return (
      <div style={{ display: "flex" }}>
        <iframe
          width="70%"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={titulo}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div style={{ width: "30%", marginLeft: "10px" }}>
          <h3>{titulo}</h3>
          <p>Banner Lateral</p>
          <img 
            src={url_contenido} 
            alt="Banner" 
            style={{ width: "100%" }} 
            onError={(e) => e.target.src = 'default-banner.png'} // Mostrar imagen predeterminada si hay error
          />
        </div>
      </div>
    );
  }

  // Manejar contenido de tipo "BT" (Banner con Título)
  if (tipo === "BT") {
    return (
      <div>
        <h3>{titulo}</h3>
        <img 
          src={url_contenido} 
          alt="Banner" 
          style={{ width: "100%" }} 
          onError={(e) => e.target.src = 'default-banner.png'} // Mostrar imagen predeterminada si hay error
        />
      </div>
    );
  }

  return <p>Tipo de contenido no soportado.</p>;
};


export default VideoPlayer;
