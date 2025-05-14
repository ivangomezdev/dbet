
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
    <div>
      <header>
        <NavBar />
      
      </header>
      <main className="blog__main" >
          <h1 className="blog__title">BLOG</h1>
     
          

        <section>
          <h1 style={{backgroundColor:"#2131",textAlign:"center",fontSize:"90px",fontFamily:"gagalin"}}>Win<span style={{color:"orange",}}>Blog</span></h1>
          <div className="blog__posts">
            {mappingPosts}
          </div>
        </section>
      </main>
      <footer className="blog__footer">
      <Footer/>
      </footer>
    </div>
  );
}
