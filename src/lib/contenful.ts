
import { createClient } from "contentful";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID_1! ,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN_1! ,
});
console.log(client,"ESTE ES CLIENT");


// Función genérica que acepta el content_type como parámetro
export async function getEntriesByContentType(contentType:string) {
  try {
    const response = await client.getEntries({
      content_type: contentType,
      include: 2, // Fetch linked assets (e.g., images in rich text)
    });
    console.log(`Datos recibidos para contentType ${contentType}:`, response);
    // Return items with includes attached
    return response.items.map((item) => ({
      ...item,
      includes: response.includes || {}, // Ensure includes is always present
    }));
  } catch (error) {
    console.error(`Error fetching entries for contentType ${contentType}:`, error);
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
    console.log("Datos recibidos de Contentful:", response);
    return response;
  } catch (error) {
    console.error("Error en getBonos:", error);
    return [];
  }
}