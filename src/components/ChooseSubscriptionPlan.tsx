"use client";
import { useRouter } from "next/navigation";
import "./subscriptionCard.css";
import Swal from "sweetalert2";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLISHABLE_KEY } from "@/lib/stripe";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

interface SubscriptionCardProps {
  cardsData?: CardData[]; // Hacer cardsData opcional
  onPlanSelect: (planName: string) => void;
}

interface CardData {
  planType: string;
  price: string;
  period?: string;
  features: string[];
  tools?: string[];
  buttonTextSpain: string;
  buttonTextLatam: string;
  hrefSpain: string;
  hrefLatam: string;
}

export default function ChooseSubscriptionPlan({ cardsData = [], onPlanSelect }: SubscriptionCardProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [hasReferralDiscount, setHasReferralDiscount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Verificar si el usuario tiene un descuento por referido
  useEffect(() => {
    const checkReferralStatus = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        const headers = {
          "Content-Type": "application/json",
        };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        } else if (!session) {
          return;
        }

        const response = await fetch("/api/referrals/status", {
          method: "GET",
          headers,
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Error al verificar el estado de referido");
        }

        const data = await response.json();
        setHasReferralDiscount(data.hasUsedReferral && data.referredUsers > 0);
      } catch (error) {
        console.error("Error verificando estado de referido:", error);
      }
    };

    if (status === "authenticated" || document.cookie.includes("token=")) {
      checkReferralStatus();
    }
  }, [status, session]);

  const handleButtonClick = async (planName: string) => {
    onPlanSelect(planName);

    // Validar autenticación
    if (!session && !document.cookie.includes("token=")) {
      Swal.fire("Error", "Debes iniciar sesión para procesar el pago", "error");
      router.push("/login");
      return;
    }

    if (planName === "FREE") {
      console.log("Session status:", status);

      Swal.fire({
        title: "Confirmar plan",
        text: "¿Estás seguro de que quieres adquirir este plan?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, seleccionar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("¡Elección realizada!", "Tu plan gratuito ha sido activado.", "success");
          router.push("/me");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Cancelado", "La elección ha sido cancelada.", "error");
        }
      });
    } else {
      // Planes premium con Stripe
      Swal.fire({
        title: "Confirmar plan",
        text: `¿Estás seguro de que quieres adquirir el plan ${planName}? ${
          hasReferralDiscount ? "Se aplicará un 20% de descuento por referido." : ""
        }`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, proceder al pago",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setIsLoading(true);
          try {
            // Intentar obtener el token JOSE de las cookies
            const token = document.cookie
              .split("; ")
              .find((row) => row.startsWith("token="))
              ?.split("=")[1];

            // Configurar los headers según el método de autenticación
            const headers = {
              "Content-Type": "application/json",
            };
            if (token) {
              headers["Authorization"] = `Bearer ${token}`;
            } else if (!session) {
              throw new Error("No estás autenticado");
            }

            const response = await fetch("/api/create-checkout-session", {
              method: "POST",
              headers,
              body: JSON.stringify({ planName }),
              credentials: "include",
            });

            // Verificar si la respuesta es JSON
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
              const text = await response.text();
              console.error("Non-JSON response received:", text);
              throw new Error("El servidor devolvió una respuesta no válida (no JSON)");
            }

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || "Error al procesar el pago");
            }

            const { sessionId } = await response.json();
            const stripe = await stripePromise;

            if (!stripe) throw new Error("Error al cargar Stripe");

            const { error } = await stripe.redirectToCheckout({ sessionId });
            if (error) {
              throw new Error(error.message);
            }
          } catch (error) {
            const errorMessage = error.message || "Error desconocido al procesar el pago";
            Swal.fire("Error", errorMessage, "error");
            console.error("Error al procesar el pago:", {
              message: error.message,
              stack: error.stack,
              response: error.response ? error.response.data : null,
            });
          } finally {
            setIsLoading(false);
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Cancelado", "La elección ha sido cancelada.", "error");
        }
      });
    }
  };

  return (
    <div className="premium-content-bg" style={{ display: "flex" }}>
      <div className="premium-content">
        <h1 className="premium-title">Subscripción a WINBET420</h1>
        <p className="premium-subtitle">
          Puedes cancelar la renovación de la suscripción cuando quieras.
        </p>
        {hasReferralDiscount && (
          <p style={{ color: "green", marginBottom: "20px" }}>
            ¡Tienes un 20% de descuento por usar un código de referido!
          </p>
        )}
        <div className="pricing-cards">
          {Array.isArray(cardsData) && cardsData.length > 0 ? (
            cardsData.map((card, index) => (
              <div className="pricing-card" key={index}>
                <div className="card-header">
                  <h3 className="plan-type">{card.planType}</h3>
                  <div className="price">
                    <span className="amount">{card.price}</span>
                    {card.period && <span className="period">{card.period}</span>}
                  </div>
                </div>
                <div className="card-body">
                  {card.features.map((feature, featureIndex) => (
                    <p className="feature" key={featureIndex}>
                      {feature}
                    </p>
                  ))}
                  {card.tools && Array.isArray(card.tools) && (
                    <p className="feature tools">
                      {card.tools.map((tool, toolIndex) => (
                        <span className="tool-link" key={toolIndex}>
                          {tool}
                        </span>
                      ))}
                    </p>
                  )}
                </div>
                <div className="card-footer">
                  {card.planType === "FREE" ? (
                    <button
                      style={{ marginBottom: "10px" }}
                      className="btn btn-premium"
                      onClick={() => handleButtonClick(card.planType)}
                      disabled={isLoading}
                    >
                      {isLoading ? "Cargando..." : card.buttonTextSpain}
                    </button>
                  ) : (
                    <>
                      <button
                        style={{ marginBottom: "10px" }}
                        className="btn btn-premium"
                        onClick={() => handleButtonClick(card.planType)}
                        disabled={isLoading}
                      >
                        {isLoading ? "Cargando..." : card.buttonTextSpain}
                      </button>
                      <button
                        className="btn btn-premiumDisabled"
                        onClick={() => handleButtonClick(card.planType)}
                        disabled
                      >
                        {isLoading ? "Cargando..." : card.buttonTextLatam}
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No hay planes disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
}