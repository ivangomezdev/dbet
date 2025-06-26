import { createClient } from "contentful";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID_1,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN_1,
  environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || "master",
});

console.log("Contentful client inicializado:", {
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID_1,
  environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || "master",
});

// Función genérica para obtener entradas por content_type
export async function getEntriesByContentType(contentType) {
  try {
    const response = await client.getEntries({
      content_type: contentType,
      include: 2,
    });
    console.log(`Datos recibidos para contentType ${contentType}:`, JSON.stringify(response.items, null, 2));
    return response.items.map((item) => ({
      ...item,
      includes: response.includes || {},
    }));
  } catch (error) {
    console.error(`Error al obtener entradas para contentType ${contentType}:`, error);
    throw error;
  }
}

// Ejemplo de uso para cada content model
export async function getBlogPosts() {
  return getEntriesByContentType("pruebaNBet");
}

export async function getBonos() {
  console.log("Ejecutando getBonos...");
  try {
    const response = await getEntriesByContentType("bonos");
    console.log("Datos recibidos de Contentful para bonos:", JSON.stringify(response, null, 2));
    return response;
  } catch (error) {
    console.error("Error en getBonos:", error);
    return [];
  }
}

export async function getBonosRecurrentes() {
  console.log("Ejecutando getBonos...");
  try {
    const response = await getEntriesByContentType("recurrentes");
    console.log("Datos recibidos de Contentful para bonos:", JSON.stringify(response, null, 2));
    return response;
  } catch (error) {
    console.error("Error en getBonos:", error);
    return [];
  }
}

export async function getVideos() {
  console.log("Ejecutando getVideos...");
  try {
    const response = await getEntriesByContentType("guides");
    console.log("Datos recibidos de Contentful para videos:", JSON.stringify(response, null, 2));
    return response;
  } catch (error) {
    console.error("Error en getVideos:", error);
    return [];
  }
}