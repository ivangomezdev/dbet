
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
       
        <div className="blog__info">
          <p>{post.fields.fecha.split("T")[0]}</p>
        <Link
          href={`/blog/${post.fields.slug}`}
          className="blog__link"
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
     
          <p className="blog__subtitle">Atención: Si sigues leyendo este blog vas a ser expuesto a informaciones que te permitirán de convertirte en un xxxx con el Matched Betting. 😀</p>
          <div className="custom-shape-divider-bottom-1742425093">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
    </svg>
</div>
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
