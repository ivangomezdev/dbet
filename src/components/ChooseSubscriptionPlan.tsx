import Link from "next/link";
import "./subscriptionCard.css";

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

const subscriptionCardsData: CardData[] = [
  {
    planType: "GRATIS",
    price: "0€",
    features: [
      "Gana 120€/15US$ Sin Riesgos",
      "Acceso a 3 Guías",
      "Acceso a 3 Video Guías",
      "Versión Limitada de las Herramientas",
    ],
    buttonTextSpain: "REGÍSTRATE GRATIS",
    buttonTextLatam: "REGÍSTRATE GRATIS",
    hrefSpain: "/free-spain",
    hrefLatam: "/free-latam",
  },
  {
    planType: "PREMIUM MENSUAL",
    price: "14.99€",
    period: "/ Mes",
    features: [
      "Gana hasta 500 €/US$ al Mes",
      "Acceso a todas las Guías",
      "Versión Completa de las Herramientas",
      "Cancela cuando quieras la suscripción",
    ],
    tools: ["NinjaClub", "Oddsmatcher", "Dutcher", "Calculador", "Favor-Favor", "Multiplicador", "Profit Tracker"],
    buttonTextSpain: "OBTÉN PREMIUM – ESPAÑA",
    buttonTextLatam: "OBTÉN PREMIUM – LATINOAMÉRICA",
    hrefSpain: "/premium-mensual-spain",
    hrefLatam: "/premium-mensual-latam",
  },
  {
    planType: "PREMIUM ANUAL",
    price: "10€",
    period: "/ Mes",
    features: [
      "Gana hasta 500 €/US$ al Mes",
      "Acceso a todas las Guías",
      "Versión Completa de las Herramientas",
      "Paga 120€ y Ahorra 60€",
    ],
    tools: ["NinjaClub", "Oddsmatcher", "Dutcher", "Calculador", "Favor-Favor", "Multiplicador", "Profit Tracker"],
    buttonTextSpain: "OBTÉN PREMIUM – ESPAÑA",
    buttonTextLatam: "OBTÉN PREMIUM – LATINOAMÉRICA",
    hrefSpain: "/premium-anual-spain",
    hrefLatam: "/premium-anual-latam",
  },
];

export default function ChooseSubscriptionPlan({ cardsData, onPlanSelect }: SubscriptionCardProps) {
  const handleButtonClick = (planName: string) => {
    onPlanSelect(planName);
   
    
  };

  return (
    <div style={{ display: "flex" }}>
      <div className="premium-content">
        <h1 style={{color:"#054F36"}} className="premium-title">Escoge tu plan</h1>
        <p style={{color:"gray"}} className="premium-subtitle">Puedes cancelar la renovación de la suscripción cuando quieras.</p>

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