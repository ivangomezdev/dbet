import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { getBonos } from "@/lib/contenful"; // Assuming this fetches all bonos

export async function generateStaticParams() {
  const bonos = await getBonos();
  return bonos.map((bono) => ({
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

  const { title, image, offerType, amount, conditions, difficulty, description, url } = bono.fields;

  // Helper function to render rich text (description field from Contentful)
  const renderRichText = (richText) => {
    if (!richText || !richText.content) return null;
    return richText.content.map((node, index) => {
      if (node.nodeType === "paragraph") {
        return <p key={index}>{node.content[0].value}</p>;
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
              src={image?.fields?.file?.url || "/placeholder.svg"}
              alt="logoBet"
            />
          </div>
        </div>

        <div className="bono-detail__content">
          <h2>Detalles de la Oferta</h2>
          <p><strong>Ganancia:</strong> {amount}€</p>
          <p><strong>Cuota mínima:</strong> {conditions || "1.80 y apuesta gratis a cualquier cuota"}</p>
          <p><strong>Tipo de Oferta:</strong> {offerType}</p>
          <p><strong>Tiempo de entrega del bono:</strong> tras realizar el depósito</p>
          <p><strong>Enlace oferta:</strong> <a href={url}>Bono de Bienvenida</a></p>
          <p><strong>Métodos de pago no válidos:</strong> Ninguno</p>
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