
import { createClient } from "contentful";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID_1! ,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN_1! ,
});
console.log(client,"ESTE ES CLIENT");


// Función genérica que acepta el content_type como parámetro
export async function getEntriesByContentType(contentType: string) {
  const response = await client.getEntries({ content_type: contentType });
  console.log(`Contentful response for ${contentType}:`, response.items);
  
  return response.items;
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