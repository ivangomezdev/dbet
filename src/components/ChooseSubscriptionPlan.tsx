
"use client"
import Router, { useRouter } from "next/router";
import "./subscriptionCard.css";
import Swal from 'sweetalert2'


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
  const handleButtonClick = (planName: string) => {
    onPlanSelect(planName);
    console.log("click");
    
 

Swal.fire({
  title: 'Confirmar plan',
  text: '¿Estás seguro de que quieres adquirir este plan?',
  icon: 'question',
  showCancelButton: true,
  confirmButtonText: 'Sí, seleccionar',
  cancelButtonText: 'Cancelar',
}).then((result) => {
  if (result.isConfirmed) {
    // Lógica para procesar la compra si el usuario confirma
    Swal.fire('¡Elección realizada!', 'Tu compra ha sido procesada.', 'success');
    router.push("/me");
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    // Lógica si el usuario cancela
    Swal.fire('Cancelado', 'La elección ha sido cancelada.', 'error');
  }
});
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