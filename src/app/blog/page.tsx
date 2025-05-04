
import NavBar from "@/components/NavBar";
import { getBlogPosts } from "@/lib/contenful";
import Link from "next/link";
import "./blog.css"
import Image from "next/image";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Footer from "@/components/Footer";

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const mappingPosts = posts.map((post: any) => {
    // Obtener la URL de la imagen
    const imageUrl = post.fields.imagen.fields.file.url;
  
    // Asegurarse de que la URL sea absoluta (agregar https si es necesario)
    const formattedUrl = imageUrl.startsWith("//") ? `https:${imageUrl}` : imageUrl;
  
    return (
      <div className="blog__post" key={post.sys.id}>
      
        <Image
          className="blog__image"
          src={formattedUrl}
          alt={post.fields.imagen.description || "Imagen del post"}
          width={250}
          height={170}
        />
        <div className="blog__contData">
        <h2>{post.fields.titulo}</h2>
        <div style={{display:"flex",justifyContent:"center",marginTop:"-24px"}}>
        <p>{post.fields.fecha.split("T")[0]}</p>
        <Link
          href={`/blog/${post.fields.slug}`}
          className="blog__link"
          style={{textDecoration:"none"}}
        >
          <VisibilityIcon/> VER 
        </Link>
        </div>
      
        </div>
      </div>
    );
  })
  
  
  return (
    <>
      <header>
        <NavBar />
      
      </header>
      <main className="blog__main" >
          <h1 className="blog__title">BLOG</h1>
     
          <p className="blog__subtitle">Atención: Si sigues leyendo este blog vas a ser expuesto a informaciones que te permitirán de convertirte en un Winbetter con el Matched Betting. 😀</p>

        <section>
          <div className="blog__posts">
            {mappingPosts}
          </div>
        </section>
      </main>
      <footer className="blog__footer">
      <Footer/>
      </footer>
    </>
  );
}
