"use client";
import { useRouter } from "next/navigation";
import "./subscriptionCard.css";
import Swal from "sweetalert2";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLISHABLE_KEY } from "@/lib/stripe";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

interface SubscriptionCardProps {
  cardsData: CardData[];
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



export default function ChooseSubscriptionPlan({ cardsData, onPlanSelect }: SubscriptionCardProps) {
  const router = useRouter();

  const handleButtonClick = async (planName: string) => {
    onPlanSelect(planName);

    if (planName === "FREE") {
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
        text: `¿Estás seguro de que quieres adquirir el plan ${planName}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, proceder al pago",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            // Obtener el token desde las cookies (react-cookies o similar)
            const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
            if (!token) throw new Error("No se encontró el token de autenticación");

            // Crear la sesión de pago en el backend
            const response = await fetch("/api/create-checkout-session", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ planName }),
            });

            const { sessionId } = await response.json();
            const stripe = await stripePromise;

            if (!stripe) throw new Error("Error al cargar Stripe");

            // Redirigir al checkout de Stripe
            const { error } = await stripe.redirectToCheckout({ sessionId });
            if (error) {
              Swal.fire("Error", error.message, "error");
            }
          } catch (error) {
            Swal.fire("Error", "Hubo un problema al procesar el pago", "error");
            console.error(error);
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Cancelado", "La elección ha sido cancelada.", "error");
        }
      });
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div className="premium-content">
        <h1 style={{ color: "#054F36" }} className="premium-title">Escoge tu plan</h1>
        <p style={{ color: "gray" }} className="premium-subtitle">Puedes cancelar la renovación de la suscripción cuando quieras.</p>

        <div className="pricing-cards">
          {cardsData.map((card, index) => (
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
                {card.tools && (
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
                <button
                  style={{ marginBottom: "10px" }}
                  className="btn btn-premium"
                  onClick={() => handleButtonClick(card.planType)}
                >
                  {card.buttonTextSpain}
                </button>
                <button className="btn btn-premium" onClick={() => handleButtonClick(card.planType)}>
                  {card.buttonTextLatam}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}