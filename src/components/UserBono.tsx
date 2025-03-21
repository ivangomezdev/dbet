"use client";

import { useState } from "react";
import "./userBono.css";


type BonosData = {
  metadata: {
    tags: any[];
    concepts: any[];
  };
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    title: string;
    image: {
      metadata: any;
      sys: any;
      fields: {
        file: {
          url: string;
        };
      };
    };
    offerType: string;
    amount: string;
    conditions?: string;
    difficulty: string;
    aadida: string;
    complete: boolean;
    slug: string;
    url: string;
    description: {
      nodeType: string;
      data: any;
      content: any[];
    };
  };
}[];

interface UserBonoProps {
  bonosData: BonosData;
}

export default function UserBono({ bonosData }: UserBonoProps) {
  const [tabActiva, setTabActiva] = useState("disponibles");

  console.log("Bonos:", bonosData);
  console.log("Tab activa:", tabActiva);

  const filtrarBonos = () => {
    if (!bonosData) return [];
    if (tabActiva === "disponibles") {
      return bonosData.filter((bono) => !bono.fields.complete);
    } else {
      return bonosData.filter((bono) => bono.fields.complete);
    }
  };

  const bonosFiltrados = filtrarBonos();

  return (
    <div className="user-bono">
      <div className="user-bono__header">
        <div className="user-bono__ninja"></div>
        <div className="user-bono__welcome">
          <h1 className="user-bono__title">BIENVENIDA</h1>
          <p className="user-bono__subtitle">
            sigue el orden de arriba a abajo
          </p>
          <div className="user-bono__divider"></div>
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

                    <div className="user-bono__actions">
                      <button className="user-bono__button user-bono__button--show">
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
              <a href={promo.link} className="user-bono__promo-link">
                {promo.alt}
              </a>
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
    alt: "Telegram",
    link: "https://t.me/bonoscasino",
  },
  {
    id: 2,
    titulo: "INVITA TUS AMIGOS & GANA",
    imagen: "/placeholder.svg?height=150&width=150",
    alt: "Invita amigos",
    link: "/referidos",
  },
  {
    id: 3,
    titulo: "DESCARGA NUESTRA APP",
    imagen: "/placeholder.svg?height=150&width=150",
    alt: "App móvil",
    link: "/app",
  },
  {
    id: 4,
    titulo: "GUÍA DE BONOS 2024",
    imagen: "/placeholder.svg?height=150&width=150",
    alt: "Guía de bonos",
    link: "/guia-bonos",
  },
];