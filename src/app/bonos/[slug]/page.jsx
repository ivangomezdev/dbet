import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { getBonos } from "@/lib/contenful";
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
  const imageUrl = image?.fields?.file?.url || "/placeholder.svg";
  console.log("Image URL:", imageUrl);

  // Helper function to render rich text (description field from Contentful)
  const renderRichText = (richText) => {
    if (!richText || !richText.content) return null;
    return richText.content.map((node, index) => {
      if (node.nodeType === "paragraph") {
        return <p key={index}>{node.content[0].value}</p>;
      } else if (node.nodeType === "ordered-list") {
        return (
          <ol key={index}>
            {node.content.map((item, itemIndex) => (
              item.nodeType === "list-item" && item.content[0].nodeType === "paragraph" ? (
                <li key={itemIndex}>{item.content[0].content[0].value}</li>
              ) : null
            ))}
          </ol>
        );
      }
      return null;
    });
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
            <img
              src={imageUrl}
              alt="logoBet"
              onError={(e) => {
                console.error("Image failed to load:", imageUrl);
                e.target.src = "/placeholder.svg"; // Fallback if image fails to load
              }}
            />
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