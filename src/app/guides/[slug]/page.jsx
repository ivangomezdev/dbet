// src/app/guides/[slug]/page.jsx
import { getVideos } from "../../../lib/contenful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import Link from "next/link";
import "./videosSlug.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

// Opciones de renderizado para el campo rich text
const renderOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p style={{ marginBottom: "15px" }}>{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node, children) => (
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        {children}
      </h1>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        {children}
      </h2>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => (
      <li style={{ marginBottom: "5px" }}>{children}</li>
    ),
    [INLINES.HYPERLINK]: (node, children) => (
      <a
        href={node.data.uri}
        style={{ color: "#00bcd4", textDecoration: "underline" }}
      >
        {children}
      </a>
    ),
  },
  renderText: (text) => {
    return text.split(":").map((part, index, array) => {
      if (index < array.length - 1) {
        return (
          <span key={index}>
            <strong>{part}:</strong>
          </span>
        );
      }
      return part;
    });
  },
};

const isValidRichText = (richText) =>
  richText &&
  richText.nodeType === "document" &&
  Array.isArray(richText.content) &&
  richText.content.length > 0;

export async function generateStaticParams() {
  try {
    const videoEntries = await getVideos();
    if (!videoEntries || !Array.isArray(videoEntries)) {
      console.error("getVideos retornó datos no válidos:", videoEntries);
      return [];
    }
    return videoEntries
      .map((entry) => {
        if (!entry.fields?.slug) {
          console.warn("Entrada sin slug:", entry);
          return null;
        }
        return { slug: entry.fields.slug };
      })
      .filter(Boolean);
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
      </div>
    );
  }

  // Obtener todos los slugs y ordenarlos numéricamente
  const slugs = videoEntries
    .filter((entry) => entry.fields?.slug)
    .map((entry) => entry.fields.slug)
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)[0], 10);
      const numB = parseInt(b.match(/\d+/)[0], 10);
      return numA - numB;
    });

  // Encontrar el índice del slug actual
  const currentIndex = slugs.indexOf(slug);
  const previousSlug = currentIndex > 0 ? slugs[currentIndex - 1] : null;
  const nextSlug = currentIndex < slugs.length - 1 ? slugs[currentIndex + 1] : null;

  const video = {
    title: videoData.fields.title || "Sin título",
    videoUrl:
      videoData.fields.videoUrl ||
      "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: videoData.fields.thumbnail?.fields?.file?.url
      ? `https:${videoData.fields.thumbnail.fields.file.url}`
      : "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742489438/1_ilbchq.png",
    description: videoData.fields.description || "No hay descripción disponible.",
    desc1: videoData.fields.desc1 || { nodeType: "document", data: {}, content: [] },
    desc2: videoData.fields.desc2 || { nodeType: "document", data: {}, content: [] },
    desc3: videoData.fields.desc3 || { nodeType: "document", data: {}, content: [] },
    desc4: videoData.fields.desc4 || { nodeType: "document", data: {}, content: [] },
    desc5: videoData.fields.desc5 || { nodeType: "document", data: {}, content: [] },
    bookmaker:
      videoData.fields.bookmaker || {
        nodeType: "document",
        data: {},
        content: [],
      },
  };

  return (
    <div style={{ backgroundColor: "#054F36" }}>
      <NavBar />
      <div
        style={{
          backgroundColor: "#054F20",
          padding: "20px",
          maxWidth: "800px",
          margin: "100px auto",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "white",
            marginBottom: "20px",
          }}
        >
          {video.title}
        </h1>
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
          {/* Botones de navegación */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "15px",
            }}
          >
            {previousSlug && (
              <Link href={`/guides/${previousSlug}`}>
                <button
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#054F",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Guía Anterior
                </button>
              </Link>
            )}
            <div style={{ flex: 1 }} /> {/* Espaciador para alinear el botón siguiente a la derecha */}
            {nextSlug && (
              <Link href={`/guides/${nextSlug}`}>
                <button
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#054F",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Guía Siguiente
                </button>
              </Link>
            )}
          </div>
        </div>

        <section
          style={{
            marginBottom: "30px",
            padding: "15px",
            backgroundColor: "#F1F0EC",
            borderRadius: "5px",
          }}
        >
          <p>{video.description}</p>
        </section>

        {/* Rich Text Sections */}
        {[
          { label: "Introducción", key: "desc1" },
          { label: "Organización", key: "desc2" },
          { label: "Conceptos Básicos", key: "desc3" },
          { label: "Profit Tracker", key: "desc4" },
          { label: "Conclusión", key: "desc5" },
        ].map(({ label, key }) => {
          const content = video[key];
          if (!isValidRichText(content)) return null;

          return (
            <section
              key={key}
              style={{
                borderRadius: "5px",
                backgroundColor: "#F1F0EC",
                padding: "10px",
                marginBottom: "30px",
              }}
            >
              <h2
                style={{
                  fontSize: "20px",
                  color: "#054F36",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                {label}
              </h2>
              {documentToReactComponents(content, renderOptions)}
            </section>
          );
        })}

        {/* Bookmaker */}
        {isValidRichText(video.bookmaker) && (
          <section
            style={{
              borderRadius: "5px",
              backgroundColor: "#F1F0EC",
              padding: "10px",
              marginBottom: "30px",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                color: "#054F36",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Bookmaker
            </h2>
            {documentToReactComponents(video.bookmaker, renderOptions)}
          </section>
        )}

        <div
          style={{
            textAlign: "center",
            marginTop: "40px",
            padding: "15px",
            backgroundColor: "#e0f7fa",
            borderRadius: "5px",
          }}
        >
          <p style={{ marginBottom: "10px" }}>¿Y ahora qué?</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}