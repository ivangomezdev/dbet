import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { getBonos } from "@/lib/contenful";
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

  const { title, image, offerType, amount, conditions, difficulty, description, url, ganancia, cuotaMinima, tiempoEntrega, metodosPagoNoValidos, enlaceOferta } = bono.fields;

  // Debug the image URL
  console.log("Image data:", image);
  const imageUrl = (image?.fields?.file?.url?.startsWith("//") ? "https:" + image?.fields?.file?.url : image?.fields?.file?.url) || "/placeholder.svg";
  console.log("Image URL:", imageUrl);

  // Debug the includes for assets
  console.log("Includes Assets:", bonos.includes?.Asset);

  // Render rich text with @contentful/rich-text-react-renderer
  const renderOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const assetId = node.data.target.sys.id;
        const asset = bonos.includes?.Asset?.find((a) => a.sys.id === assetId) || null;
        console.log(`Asset ID: ${assetId}, Found Asset:`, asset);
        const assetUrl = asset?.fields?.file?.url
          ? (asset.fields.file.url.startsWith("//") ? "https:" + asset.fields.file.url : asset.fields.file.url)
          : "/placeholder.svg";
        return asset ? (
          <img
            src={assetUrl}
            alt={`Embedded asset ${assetId}`}
            style={{ maxWidth: "100%", margin: "10px 0" }}
          />
        ) : null;
      },
      [INLINES.HYPERLINK]: (node) => (
        <a href={node.data.uri}>{node.content[0].value}</a>
      ),
    },
  };

  const renderRichText = (richText) => {
    if (!richText || !richText.content) return null;
    return documentToReactComponents(richText, renderOptions);
  };

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="bono-detail">
        <div className="bono-detail__header">
          <h1>{title}</h1>
          <div className="bono-detail__logo">
            <img src={imageUrl} alt="logoBet" />
          </div>
        </div>

        <div className="bono-detail__content">
          <h2>Detalles de la Oferta</h2>
          <p><strong>Ganancia:</strong> {ganancia || amount}€</p>
          <p><strong>Cuota mínima:</strong> {cuotaMinima}</p>
          <p><strong>Tipo de Oferta:</strong> {offerType}</p>
          <p><strong>Tiempo de entrega del bono:</strong> {tiempoEntrega}</p>
          <p><strong>Enlace oferta:</strong> <a href={url}>{enlaceOferta}</a></p>
          <p><strong>Métodos de pago no válidos:</strong> {metodosPagoNoValidos}</p>
          <a href={url}>Contacta con el corredor de apuestas</a>
        </div>

        <div className="bono-detail__description">
          <h2>Descripción de la oferta</h2>
          {renderRichText(description)}
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}