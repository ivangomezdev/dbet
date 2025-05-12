"use client";

import { useState } from "react";
import "./userBono.css";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Updated import for App Router

// ... (type definitions remain the same)

export default function UserBono({ bonosData }) {
  const [tabActiva, setTabActiva] = useState("disponibles");
  const [cookies] = useCookies(["token"]);
  const { data: session } = useSession();
  const router = useRouter(); // Use the router from next/navigation

  const showLink = !session?.user && !cookies.token;

  const filtrarBonos = () => {
    if (!bonosData) return [];
    if (tabActiva === "disponibles") {
      return bonosData.filter((bono) => !bono.fields.complete);
    } else {
      return bonosData.filter((bono) => bono.fields.complete);
    }
  };

  const bonosFiltrados = filtrarBonos();

  // Function to handle the "MUESTRA" button click
  const handleShowDetails = (slug) => {
    router.push(`/bonos/${slug}`); // Navigate to the dynamic route
  };

  return (
    <div className="user-bono">
      <div className="user-bono__header">
        <div className="user-bono__welcome">
          <h1 className="user-bono__title420">
            Bonos<span style={{ color: "#FD910E" }}>420</span>
          </h1>
        </div>
      </div>

      <div className="user-bono__content">
        <div className="user-bono__main">
          <div className="user-bono__tabs">
            <button
              className={`user-bono__tab ${
                tabActiva === "disponibles" ? "user-bono__tab--active" : ""
              }`}
              onClick={() => setTabActiva("disponibles")}
            >
              Disponibles
            </button>
            <button
              className={`user-bono__tab ${
                tabActiva === "completas" ? "user-bono__tab--active" : ""
              }`}
              onClick={() => setTabActiva("completas")}
            >
              Completas
            </button>
          </div>

          <div className="user-bono__list">
            {bonosFiltrados && bonosFiltrados.length > 0 ? (
              bonosFiltrados.map((bono, key) => (
                <div
                  key={key}
                  className={`user-bono__item ${
                    bono.fields.complete ? "user-bono__item--completed" : ""
                  }`}
                >
                  <div className="user-bono__logo">
                    <img
                      src={
                        bono.fields.image?.fields?.file?.url || "/placeholder.svg"
                      }
                      alt="logoBet"
                      className="user-bono__logo-img"
                    />
                  </div>

                  <div className="user-bono__details">
                    <h3 className="user-bono__item-title">{bono.fields.title}</h3>
                    <p className="user-bono__offer-type">
                      Tipo de Oferta:{" "}
                      <span className="user-bono__offer-value">
                        {bono.fields.offerType}
                      </span>
                    </p>
                    <p className="user-bono__promo">{bono.fields.conditions}</p>

                    <div className="user-bono__meta">
                      <div className="user-bono__difficulty">
                        Dificultad:
                        <span
                          className={`user-bono__difficulty-value ${
                            bono.fields.difficulty === "Fácil"
                              ? "user-bono__difficulty-value--easy"
                              : bono.fields.difficulty === "Media"
                              ? "user-bono__difficulty-value--medium"
                              : "user-bono__difficulty-value--hard"
                          }`}
                        >
                          {bono.fields.difficulty}
                        </span>
                      </div>
                      <div className="user-bono__date">
                        Añadida:{" "}
                        <span className="user-bono__date-value">
                          {bono.fields.aadida}
                        </span>
                      </div>
                    </div>

                    {!showLink && (
                      <div className="user-bono__actions">
                        <button
                          className="user-bono__button user-bono__button--show"
                          onClick={() => handleShowDetails(bono.fields.slug)}
                        >
                          MUESTRA
                        </button>
                        {!bono.fields.complete ? (
                          <></>
                        ) : (
                          <button
                            className="user-bono__button user-bono__button--complete"
                            disabled
                          >
                            COMPLETADA
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="user-bono__value">
                    <div className="user-bono__value-label">Bonos</div>
                    <div className="user-bono__value-amount">
                      {bono.fields.amount}$
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay bonos {tabActiva === "disponibles" ? "disponibles" : "completados"}</p>
            )}
          </div>
        </div>

        <div className="user-bono__sidebar">
          {promociones.map((promo) => (
            <div key={promo.id} className="user-bono__promo">
              <h3 className="user-bono__promo-title">{promo.titulo}</h3>
              <Link href={promo.link} className="user-bono__promo-link">
                {promo.alt}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const promociones = [
  {
    id: 1,
    titulo: "¡También estamos en Telegram!",
    imagen: "/placeholder.svg?height=150&width=150",
    alt: "App móvil",
    link: "https://t.me/bonoscasino",
  },
  {
    id: 3,
    titulo: "GUÍA DE BONOS 2024",
    imagen: "/placeholder.svg?height=150&width=150",
    alt: "Guía de bonos",
    link: "/blog",
  },
];