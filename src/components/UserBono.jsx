"use client";

import { useState } from "react";
import "./userBono.css";
import { useCookies } from "react-cookie";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UserBono({ bonosData }) {
  const [tabActiva, setTabActiva] = useState("disponibles");
  const [cookies] = useCookies(["token"]);
  const [userData, setUserData] = useState(null); // Assuming userData might be fetched elsewhere
  const [videos, setVideos] = useState([]); // Assuming videos is used elsewhere
  const { data: session } = useSession();
  const router = useRouter();

  // Determine authentication and subscription status
  const isAuthenticated = !!session || !!cookies.token;
  const subscriptionStatus = session?.user?.subscriptionStatus || userData?.subscriptionStatus || "inactive";
  const hasPremiumSubscription = subscriptionStatus === "MONTHLY" || subscriptionStatus === "YEAR";
  const isFreePlan = subscriptionStatus === "FREE" || subscriptionStatus === "inactive";

  const filtrarBonos = () => {
    if (!bonosData) return [];
    if (tabActiva === "disponibles") {
      return bonosData.filter((bono) => !bono.fields.complete);
    } else {
      return bonosData.filter((bono) => bono.fields.complete);
    }
  };

  const bonosFiltrados = filtrarBonos();

  const handleShowDetails = (slug) => {
    if (!slug) {
      console.error("Slug is missing for this bono");
      return;
    }

    if (!isAuthenticated) {
      // Unauthenticated users are redirected to register
      router.push("/auth/register");
    } else if (isFreePlan) {
      // Authenticated users with free or inactive plan go to changePlan
      router.push("/changePlan");
    } else if (hasPremiumSubscription) {
      // Authenticated users with premium plans proceed to bono details
      router.push(`/bonos/${slug}`);
    } else {
      // Fallback for any unexpected subscription status
      console.warn("Unexpected subscription status:", subscriptionStatus);
      router.push("/changePlan"); // Or handle differently based on your requirements
    }
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

                    <div className="user-bono__actions">
                      <button
                        className="user-bono__button user-bono__button--show"
                        onClick={() => handleShowDetails(bono.fields.slug)}
                        disabled={!bono.fields.slug} // Disable button if slug is missing
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
                  </div>

                  <div className="user-bono__value">
                    <div className="user-bono__value-label">Bonos</div>
                    <div className="user-bono__value-amount">
                      {bono.fields.amount}€
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay bonos {tabActiva === "disponibles" ? "disponibles" : "completados"}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}