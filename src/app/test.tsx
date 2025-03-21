import { getBlogPosts } from "@/lib/contenful";

export default async function TestPage() {
  const posts = await getBlogPosts();

  console.log("Contentful response:", posts); // <-- Verifica en la consola del servidor

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Prueba de Contentful</h1>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </main>
  );
}
