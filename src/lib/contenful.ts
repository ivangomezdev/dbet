import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID_1!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN_1!,
});

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
  return getEntriesByContentType("bonos");
}