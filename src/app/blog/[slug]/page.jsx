import NavBar from "@/components/NavBar";
import { getBlogPosts } from "@/lib/contenful";
import "./slug.css";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.fields.slug }));
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.fields.slug === resolvedParams.slug);

  if (!post) {
    return <div className="p-6">Post no encontrado</div>;
  }

  const imageUrl = post.fields.imagen.fields.file.url;
  const formattedUrl = imageUrl.startsWith("//") ? `https:${imageUrl}` : imageUrl;

  console.log("Post completo:", post.fields);

  const content = post.fields.body || "Contenido no disponible";

  return (
    <div className="article">
      <header className="article__header">
        <NavBar />
        <nav className="article__nav">
          <div className="article__breadcrumbs">
            <Link href="/" style={{textDecoration:"none"}} className="article__breadcrumb-link">
              Blog
            </Link>
            <span className="article__breadcrumb-separator">/</span>
            <Link style={{textDecoration:"none"}} href="/environment" className="article__breadcrumb-link">
              Post
            </Link>
          </div>
          <div className="article__actions">
            <button className="article__follow-btn">
           
            🔥 Síguenos
            </button>
          </div>
        </nav>

        <h1 style={{ padding: "10px" }} className="article__title">
          {post.fields.titulo}
        </h1>

        <div style={{ padding: "10px" }} className="article__meta">
          <span className="article__author">Por WinBet Team</span>
          <span className="article__date">{post.fields.fecha.split("T")[0]}</span>
        </div>

        <div style={{ padding: "10px" }} className="article__share">
          <span className="article__share-label">Compartir:</span>
          <div className="article__share-buttons">
            <button style={{display:"none"}} className="article__share-btn article__share-btn--facebook">
              Facebook
            </button>
            <button style={{display:"none"}} className="article__share-btn article__share-btn--twitter">
              Twitter
            </button>
            <button style={{display:"none"}} className="article__share-btn article__share-btn--email">
              Email
            </button>
          </div>
        </div>
      </header>

      <div className="article__content">
        <div className="article__main">
          <figure className="article__figure">
            <Image
              src={formattedUrl}
              alt="Descripción de imagen"
              width={600}
              height={350}
              className="article__image"
            />
            <figcaption className="article__caption">
              Descripción de Imagen
            </figcaption>
          </figure>

          <div className="article__text">
            <p className="article__paragraph">
              {post.fields.contenido?.content?.[0]?.content?.[0]?.value ||
                content}
            </p>
          </div>
        </div>

        <aside className="article__sidebar">
          <section className="article__popular">
            <h2 className="article__sidebar-title">Posts Relacionados</h2>

            <div className="article__popular-items">
              {posts.map((i, index) => {
                const relatedImageUrl = i.fields.imagen.fields.file.url.startsWith(
                  "//"
                )
                  ? `https:${i.fields.imagen.fields.file.url}`
                  : i.fields.imagen.fields.file.url;

                return (
                  <article key={index} className="article__popular-item">
                    <Image
                      src={relatedImageUrl}
                      alt="News thumbnail"
                      width={120}
                      height={80}
                      className="article__popular-image"
                    />
                    <div>
                    <h3 className="article__popular-title">
                      <Link style={{textDecoration:"none"}} href="#" className="article__popular-link">
                        {i.fields.titulo}
                      </Link>
                    </h3>
                    <button className="article__popular-button">Ver este post</button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </aside>
        
        
      </div>
          <Footer/>
    </div>
  );
}