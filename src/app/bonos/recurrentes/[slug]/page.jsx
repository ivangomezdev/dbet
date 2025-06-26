import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { getBonosRecurrentes } from "../../../../lib/contenful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import "./bonoDetail.css";

export const revalidate = 60;

export async function generateStaticParams() {
  const bonos = await getBonosRecurrentes();
  return bonos
    .filter((bono) => typeof bono.fields.slug === "string" && bono.fields.slug.trim() !== "")
    .map((bono) => ({
      slug: bono.fields.slug,
    }));
}

// Función auxiliar para verificar si un campo richText tiene contenido significativo
const hasMeaningfulContent = (richText) => {
  if (!richText || !richText.content || !Array.isArray(richText.content)) {
    return false;
  }

  return richText.content.some((node) => {
    if (node.nodeType === "paragraph" || node.nodeType === "heading-2" || node.nodeType === "heading-3") {
      return node.content.some((contentNode) => {
        return contentNode.nodeType === "text" && contentNode.value.trim() !== "";
      });
    }
    if (node.nodeType === "unordered-list" || node.nodeType === "ordered-list") {
      return node.content.some((listItem) => {
        return listItem.content.some((contentNode) => {
          return contentNode.content.some((textNode) => {
            return textNode.nodeType === "text" && textNode.value.trim() !== "";
          });
        });
      });
    }
    return false;
  });
};

export default async function BonoDetailPage({ params }) {
  const { slug } = params;
  const bonos = await getBonosRecurrentes();
  const bono = bonos.find((b) => b.fields.slug === slug);

  if (!bono) {
    console.warn(`Bono con slug ${slug} no encontrado`);
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
    url,
    ganancia,
    cuotaMinima,
    tiempoEntrega,
    metodosPagoNoValidos,
    enlaceOferta,
  } = bono.fields;

  const imageUrl =
    (image?.fields?.file?.url?.startsWith("//")
      ? "https:" + image.fields.file.url
      : image?.fields?.file?.url) || "/placeholder.svg";

  const renderOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const assetId = node.data.target.sys.id;
        const asset = bonos[0]?.includes?.Asset?.find((a) => a.sys.id === assetId) || null;
        if (!asset) {
          console.warn(`Asset no encontrado para ID: ${assetId}`);
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
      [BLOCKS.UL_LIST]: (node, children) => {
        console.log("Rendering UL_LIST:", JSON.stringify(node, null, 2));
        return <ul className="bono-detail__list">{children}</ul>;
      },
      [BLOCKS.OL_LIST]: (node, children) => {
        console.log("Rendering OL_LIST:", JSON.stringify(node, null, 2));
        return <ol className="bono-detail__list">{children}</ol>;
      },
      [BLOCKS.LIST_ITEM]: (node, children) => {
        console.log("Rendering LIST_ITEM:", JSON.stringify(node, null, 2));
        return <li className="bono-detail__list-item">{children}</li>;
      },
      [BLOCKS.PARAGRAPH]: (node, children) => {
        console.log("Rendering PARAGRAPH:", JSON.stringify(node, null, 2));
        if (!children || children.every(child => !child)) return null;
        return <p className="bono-detail__paragraph">{children}</p>;
      },
      [BLOCKS.HEADING_2]: (node, children) => {
        console.log("Rendering HEADING_2:", JSON.stringify(node, null, 2));
        return <h2 className="bono-detail__heading-2">{children}</h2>;
      },
      [BLOCKS.HEADING_3]: (node, children) => {
        console.log("Rendering HEADING_3:", JSON.stringify(node, null, 2));
        return <h3 className="bono-detail__heading-3">{children}</h3>;
      },
    },
    renderText: (text) => {
      return text.trim() ? text : null;
    },
  };

  const renderRichText = (richText, fieldName) => {
    if (!richText || !richText.content || !hasMeaningfulContent(richText)) {
      console.warn(`Rich text está vacío o inválido para el campo ${fieldName}:`, richText);
      return null; // No renderiza nada si el contenido no es significativo
    }
    console.log(`Rendering rich text for ${fieldName}:`, JSON.stringify(richText, null, 2));
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
          <div>
            <h2 style={{ color: "#000000", fontWeight: "700" }}>Detalles de la Oferta</h2>
            <p>
              <p style={{ color: "#054F36", fontWeight: "bold", fontSize: "25px" }}>
                Ganancia: <span style={{ color: "black" }}>{ganancia || amount}</span>€
              </p>
            </p>
            <p>
              <p style={{ color: "#054F36", fontWeight: "bold", fontSize: "25px" }}>
                Cuota mínima: <span style={{ color: "black" }}>{cuotaMinima || "No especificada"}</span>
              </p>
            </p>
            <p>
              <p style={{ color: "#054F36", fontWeight: "bold", fontSize: "25px" }}>
                Tipo de Oferta: <span style={{ color: "black" }}>{offerType}</span>
              </p>
            </p>
            <p>
              <p style={{ color: "#054F36", fontWeight: "bold", fontSize: "25px" }}>
                Tiempo de entrega Twin del bono: <span style={{ color: "black" }}>{tiempoEntrega || "No especificado"}</span>
              </p>
            </p>
            <p>
              <p style={{ color: "white", fontSize: "21px" }}>Enlace oferta:</p>{" "}
              <a
                href={url}
                style={{ textDecoration: "none", fontFamily: "Rowdies-Light", color: "orange", marginTop: "60px" }}
                target="_blank"
                rel="noopener noreferrer"
                className="bono-detail__link"
              >
                Visitar oferta
              </a>
            </p>
            {metodosPagoNoValidos !== "Ninguno" && (
              <p>
                <p style={{ color: "#054F36", fontSize: "20px" }}>Métodos de pago no válidos:</p>{" "}
                {metodosPagoNoValidos || "Ninguno"}
              </p>
            )}
          </div>
          <div className="bono-detail__image">
            <img src={imageUrl} alt="Bono image" />
          </div>
        </div>
        <div className="bono-detail__description">
          <div className="bono-detail__details" style={{ padding: "20px" }}>
            {renderRichText(description, "description")}
          </div>

          {/* Renderiza el contenedor solo si hay al menos una descripción adicional con contenido significativo */}
          {[
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
          ].some((desc) => hasMeaningfulContent(desc)) && (
            <div className="bono-detail__additional-descriptions">
              {[
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
              ].map((desc, index) =>
                hasMeaningfulContent(desc) ? (
                  <div key={index} className="bono-detail__description-item">
                    {renderRichText(desc, `description${index + 1}`)}
                  </div>
                ) : null
              )}
            </div>
          )}
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}