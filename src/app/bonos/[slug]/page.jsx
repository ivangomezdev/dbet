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
    description1,
    description2,
    description3,
    description4,
    description5,
    description6,
    description7,
    description8,
    description9,
    description10,
    description11,
    description12,
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

  const renderRichText = (richText, fieldName) => {
    if (!richText || !richText.content) {
      console.warn(`Rich text is empty or invalid for field ${fieldName}:`, richText);
      return <p>No hay descripción disponible para {fieldName}.</p>;
    }
    return documentToReactComponents(richText, renderOptions);
  };

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
          <div >
            <h2 style={{color:"#000000"}}>Detalles de la Oferta</h2>
            <p>
              <p style={{ color: "#054F36", fontSize: "19px" }}>Ganancia: <span style={{color:"black"}}> {ganancia || amount}</span>€</p>
            </p>
            <p>
              <p style={{color: "#054F36", fontSize: "19px" }}>Cuota mínima: <span style={{color:"black"}}>{cuotaMinima || "No especificada"}</span></p> 
            </p>
            <p>
              <p style={{color: "#054F36", fontSize: "19px" }}>Tipo de Oferta: <span style={{color:"black"}}>{offerType}</span></p>
            </p>
            <p>
              <p style={{color: "#054F36", fontSize: "19px" }}>Tiempo de entrega del bono: <span style={{color:"black"}}>{tiempoEntrega || "No especificado"}</span></p>
            </p>
            <p>
              <p style={{color: "white", fontSize: "19px" }}>Enlace oferta:</p>{" "}
              <a href={url} style={{textDecoration:"none",color:"orange",marginTop:"60px"}} target="_blank" rel="noopener noreferrer" className="bono-detail__link">
                Visitar oferta
              </a>
            </p>
           {metodosPagoNoValidos !== "Ninguno" && 
               (<p>
              <p style={{ color: "#054F36", fontSize: "20px" }}>Métodos de pago no válidos:</p>{" "}
              {metodosPagoNoValidos || "Ninguno"}
            </p>)
           
          }
          </div>
          <div className="bono-detail__image">
            <img src={imageUrl} />
          </div>
        </div>
        <div className="bono-detail__description">
      
          <div className="bono-detail__details">
          {renderRichText(description, "description")}
          </div>
          <div className="bono-detail__additional-descriptions">
            {description1 && (
              <div className="bono-detail__description-item">
                {renderRichText(description1, "description1")}
              </div>
            )}
            {description2 && (
              <div className="bono-detail__description-item">
                {renderRichText(description2, "description2")}
              </div>
            )}
            {description3 && (
              <div className="bono-detail__description-item">
                {renderRichText(description3, "description3")}
              </div>
            )}
            {description4 && (
              <div className="bono-detail__description-item">
                {renderRichText(description4, "description4")}
              </div>
            )}
            {description5 && (
              <div className="bono-detail__description-item">
                {renderRichText(description5, "description5")}
              </div>
            )}
            {description6 && (
              <div className="bono-detail__description-item">
                {renderRichText(description6, "description6")}
              </div>
            )}
            {description7 && (
              <div className="bono-detail__description-item">
                {renderRichText(description7, "description7")}
              </div>
            )}
            {description8 && (
              <div className="bono-detail__description-item">
                {renderRichText(description8, "description8")}
              </div>
            )}
            {description9 && (
              <div className="bono-detail__description-item">
                {renderRichText(description9, "description9")}
              </div>
            )}
            {description10 && (
              <div className="bono-detail__description-item">
                {renderRichText(description10, "description10")}
              </div>
            )}
            {description11 && (
              <div className="bono-detail__description-item">
                {renderRichText(description11, "description11")}
              </div>
            )}
            {description12 && (
              <div className="bono-detail__description-item">
                {renderRichText(description12, "description12")}
              </div>
            )}
          </div>
          
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}