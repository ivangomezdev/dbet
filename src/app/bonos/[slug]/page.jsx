import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { getBonos } from "../../../lib/contenful"; // Ensure `contentful` is lowercase
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import "./bonoDetail.css";

export async function generateStaticParams() {
  const bonos = await getBonos();
  return bonos
    .filter((bono) => typeof bono.fields.slug === "string" && bono.fields.slug.trim() !== "")
    .map((bono) => ({
      slug: bono.fields.slug,
    }));
}

export default async function BonoDetailPage({ params }) {
  const { slug } = params;
  const bonos = await getBonos();
  const bono = bonos.find((b) => b.fields.slug === slug);

  if (!bono) {
    return <div>Bono no encontrado</div>;
  }

  const {
    title,
    image,
    offerType,
    amount,
    conditions,
    difficulty,
    description,
    url,
    ganancia,
    cuotaMinima,
    tiempoEntrega,
    metodosPagoNoValidos,
    enlaceOferta,
  } = bono.fields;

  // Debug the image URL
  console.log("Image data:", image);
  const imageUrl =
    (image?.fields?.file?.url?.startsWith("//")
      ? "https:" + image.fields.file.url
      : image?.fields?.file?.url) || "/placeholder.svg";
  console.log("Image URL:", imageUrl);

  // Debug the includes for assets
  console.log("Includes Assets:", bonos[0]?.includes?.Asset);

 
  
  // Render rich text with @contentful/rich-text-react-renderer
  const renderOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const assetId = node.data.target.sys.id;
        // Find the asset in the includes array
        const asset = bonos[0]?.includes?.Asset?.find((a) => a.sys.id === assetId) || null;
        console.log(`Asset ID: ${assetId}, Found Asset:`, asset);
        if (!asset) {
          console.warn(`Asset with ID ${assetId} not found in includes`);
          return <img src="/placeholder.svg" alt="Missing asset" style={{ maxWidth: "100%", margin: "10px 0" }} />;
        }
        const assetUrl = asset.fields?.file?.url
          ? asset.fields.file.url.startsWith("//")
            ? "https:" + asset.fields.file.url
            : asset.fields.file.url
          : "/placeholder.svg";
        return (
          <img
            src={assetUrl}
            alt={asset.fields?.title || `Embedded asset ${assetId}`}
            style={{ maxWidth: "100%", margin: "10px 0" }}
            className="bono-detail__embedded-image"
          />
        );
      },
      [INLINES.HYPERLINK]: (node) => (
        <a href={node.data.uri} className="bono-detail__link">
          {node.content[0].value}
        </a>
      ),
    },
  };

  const renderRichText = (richText) => {
    if (!richText || !richText.content) {
      console.warn("Rich text is empty or invalid:", richText);
      return <p>No hay descripción disponible.</p>;
    }
    return documentToReactComponents(richText, renderOptions);
  };

  console.log(image,"esta es la imagennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
  return (
    <div className="bono-body">
      <header>
        <NavBar />
      </header>
      <main className="bono-detail">
        <div className="bono-detail__header">
          <h1>{title}</h1>
          <div className="bono-detail__logo">
            <img src={imageUrl} alt="logoBet" className="bono-detail__logo-img" />
          </div>
        </div>

        <div className="bono-detail__content">
         <div>
          <h2>Detalles de la Oferta</h2>
          <p>
            <p style={{color:"white",fontSize:"20px"}}>Ganancia:</p> {ganancia || amount}€
          </p>
          <p>
            <p style={{color:"white",fontSize:"20px"}}>Cuota mínima:</p> {cuotaMinima || "No especificada"}
          </p>
          <p>
            <p style={{color:"white",fontSize:"20px"}}>Tipo de Oferta:</p> {offerType}
          </p>
          <p>
            <p style={{color:"white",fontSize:"20px"}}>Tiempo de entrega del bono:</p> {tiempoEntrega || "No especificado"}
          </p>
          <p>
            <p style={{color:"white",fontSize:"20px"}}>Enlace oferta:</p>{" "}
            <a href={url} className="bono-detail__link">
              {enlaceOferta || "Visitar oferta"}
            </a>
          </p>
          <p>
            <p style={{color:"white",fontSize:"20px"}}>Métodos de pago no válidos:</p>{" "}
            {metodosPagoNoValidos || "Ninguno"}
          </p>
       
             </div> 
             <div className="bono-detail__image">
        <img  src={imageUrl} />
        </div>
          </div>
       <div className="bono-detail__description">
          <h2 style={{fontSize:"40px",color:"white"}}>Descripción de la oferta</h2>
          {renderRichText(description)}
          <img style={{position:"relative",top:"200px",right:"100px"}} src="https://res.cloudinary.com/dllkefj8m/image/upload/v1746049880/Screenshot-removebg-preview_ukah2o.png" alt="" />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}