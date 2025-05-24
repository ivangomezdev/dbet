// src/app/guides/[slug]/page.jsx
import { getVideos } from "../../../lib/contenful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import "./videosSlug.css"
import NavBar from "@/components/NavBar";

// Opciones de renderizado para el campo bookmaker (rich text)
const renderOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p style={{ marginBottom: "15px" }}>{children}</p>,
    [BLOCKS.HEADING_1]: (node, children) => <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>{children}</h1>,
    [BLOCKS.HEADING_2]: (node, children) => <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>{children}</h2>,
    [BLOCKS.LIST_ITEM]: (node, children) => <li style={{ marginBottom: "5px" }}>{children}</li>,
    [INLINES.HYPERLINK]: (node, children) => (
      <a href={node.data.uri} style={{ color: "#00bcd4", textDecoration: "underline" }}>
        {children}
      </a>
    ),
  },
  renderText: (text) => {
    // Aplicar negrita al texto antes de los dos puntos
    return text.split(":").map((part, index, array) => {
      if (index < array.length - 1) {
        return (
          <span key={index}>
            <strong>{part}:</strong>
            {index < array.length - 1 ? "" : part}
          </span>
        );
      }
      return part;
    });
  },
};

export async function generateStaticParams() {
  try {
    const videoEntries = await getVideos();
    if (!videoEntries || !Array.isArray(videoEntries)) {
      console.error("getVideos retornó datos no válidos:", videoEntries);
      return [];
    }
    return videoEntries.map((entry) => {
      if (!entry.fields?.slug) {
        console.warn("Entrada sin slug:", entry);
        return null;
      }
      return { slug: entry.fields.slug };
    }).filter(Boolean);
  } catch (error) {
    console.error("Error en generateStaticParams:", error);
    return [];
  }
}

export default async function VideoDetail({ params }) {
  const { slug } = params;
  const videoEntries = await getVideos();
  const videoData = videoEntries.find((entry) => entry.fields.slug === slug);

  if (!videoData) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Error</h1>
        <p>Video no encontrado</p>
        <BackButton />
      </div>
    );
  }

  const video = {
    title: videoData.fields.title || "Sin título",
    videoUrl: videoData.fields.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: videoData.fields.thumbnail?.fields?.file?.url
      ? `https:${videoData.fields.thumbnail.fields.file.url}`
      : "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742489438/1_ilbchq.png",
    description: videoData.fields.description || "No hay descripción disponible.",
    introduction: videoData.fields.introduction || "Introducción no disponible.",
    organization: videoData.fields.organization || "Organización no disponible.",
    concepts: videoData.fields.concepts || "Conceptos no disponibles.",
    profit: videoData.fields.profit || "Profit no disponible.",
    bookmaker: videoData.fields.bookmaker || { nodeType: "document", data: {}, content: [] }, // Fallback para rich text
    conclusion: videoData.fields.conclusion || "Conclusión no disponible.",
  };

  // Validar que bookmaker sea un objeto rich text válido
  const isValidRichText = video.bookmaker && video.bookmaker.nodeType === "document" && Array.isArray(video.bookmaker.content);

  return (<div style={{backgroundColor:"#054F36"}}>
    <NavBar/>
    <div style={{backgroundColor:"#054F20",padding: "20px", maxWidth: "800px", margin: "100px auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold",color:"white", marginBottom: "20px" }}>{video.title}</h1>
      <div style={{ marginBottom: "20px" }}>
        <iframe
          width="100%"
          height="450"
          src={video.videoUrl}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <section style={{ marginBottom: "30px",padding:"10px", backgroundColor: "#F1F0EC", padding: "15px", borderRadius: "5px" }}>
        <p>{video.description}</p>
      </section>
      <section style={{ borderRadius:"5px",backgroundColor:"#F1F0EC",padding:"10px",marginBottom: "30px" }}>
        <h2 style={{ fontSize: "20px",color:"#054F36", fontWeight: "bold", marginBottom: "10px" }}>Introducción</h2>
        <p>{video.introduction}</p>
      </section>
      <section style={{ borderRadius:"5px",backgroundColor:"#F1F0EC",padding:"10px",marginBottom: "30px" }}>
        <h2 style={{ fontSize: "20px",color:"#054F36", fontWeight: "bold", marginBottom: "10px" }}>Cómo está organizado nuestro sitio web</h2>
        <p>{video.organization}</p>
      </section>
      <section style={{borderRadius:"5px", backgroundColor:"#F1F0EC",padding:"10px",marginBottom: "30px" }}>
        <h2 style={{ fontSize: "20px",color:"#054F36", fontWeight: "bold", marginBottom: "10px" }}>Conceptos Básicos</h2>
        <p>{video.concepts}</p>
      </section>
      <section style={{borderRadius:"5px", backgroundColor:"#F1F0EC",padding:"10px",marginBottom: "30px" }}>
        <h2 style={{ fontSize: "20px",color:"#054F36", fontWeight: "bold", marginBottom: "10px" }}>Profit Tracker</h2>
        <p>{video.profit}</p>
      </section>
      <section style={{borderRadius:"5px",backgroundColor:"#F1F0EC",padding:"10px", marginBottom: "30px" }}>
        <h2 style={{ fontSize: "20px", color:"#054F36",fontWeight: "bold", marginBottom: "10px" }}>Bookmaker</h2>
        {isValidRichText ? (
          documentToReactComponents(video.bookmaker, renderOptions)
        ) : (
          <p>Contenido no disponible para Bookmaker.</p>
        )}
      </section>
      <section style={{borderRadius:"5px",backgroundColor:"#F1F0EC",padding:"10px",marginBottom: "30px" }}>
        <h2 style={{ fontSize: "20px", color:"#054F36",fontWeight: "bold", marginBottom: "10px" }}>Conclusión</h2>
        <p>{video.conclusion}</p>
      </section>
      <div style={{ textAlign: "center", marginTop: "40px", padding: "15px", backgroundColor: "#e0f7fa", borderRadius: "5px" }}>
        <p style={{ marginBottom: "10px" }}>¿Y ahora qué?</p>

      </div>
    </div>
    </div>
  );
}