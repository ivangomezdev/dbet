import Link from "next/link"
import "./subscriptionCard.css"

interface SubscriptionCardProps {
  hrefFree?: string;
  hrefMensual?: string;
  hrefAnual?:string;
  subscriptionText?:string;
}

export default function SubscriptionCard(hrefsData: SubscriptionCardProps) {
  const safeFreeHref = hrefsData.hrefFree || "#"; 
  const safeMensualHref = hrefsData.hrefMensual || "#"; 
  const safeAnualHref = hrefsData.hrefAnual || "#"; 
  const subscriptionTitle = hrefsData.subscriptionText || "Desbloquea todo el potencial de nuestra app" ;
  return (
    <div className="premium-container">
      <div className="decorative-elements">
        {/* Estrellas - más estrellas para el cielo nocturno */}
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 70}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}

        {/* Luna */}
        <div className="moon"></div>

        {/* Gradas vistas desde abajo */}
        <div className="stands-container">
          <div className="stands stands-left"></div>
          <div className="stands stands-right"></div>
        </div>

        {/* Campo de fútbol (solo césped) */}
        <div className="field"></div>
      </div>

      <div className="premium-content">
        <h1 className="premium-title">{subscriptionTitle || "Premium" }</h1>
        <p className="premium-subtitle">Puedes cancelar la renovación de la suscripción cuando quieras.</p>

        <div className="pricing-cards">
          <div className="pricing-card">
            <div className="card-header">
              <h3 className="plan-type">GRATIS</h3>
              <div className="price">
                <span className="amount">0€</span>
              </div>
            </div>

            <div className="card-body">
              <p className="feature">Gana 120€/15US$ Sin Riesgos</p>
              <p className="feature">Acceso a 3 Guías</p>
              <p className="feature">Acceso a 3 Video Guías</p>
              <p className="feature">Versión Limitada de las Herramientas</p>
            </div>

            <div className="card-footer">
              <Link style={{textDecoration:"none"}} href={safeFreeHref}>
              <button className="btn btn-register">REGÍSTRATE GRATIS</button>
              </Link>
            </div>
          </div>

          <div className="pricing-card">
            <div className="card-header">
              <h3 className="plan-type">PREMIUM MENSUAL</h3>
              <div className="price">
                <span className="amount">14.99€</span>
                <span className="period">/ Mes</span>
              </div>
            </div>

            <div className="card-body">
              <p className="feature">Gana hasta 500 €/US$ al Mes</p>
              <p className="feature">Acceso a todas las Guías</p>
              <p className="feature">Versión Completa de las Herramientas</p>
              <p className="feature tools">
                (<span className="tool-link">NinjaClub</span>,<span className="tool-link">Oddsmatcher</span>,
                <span className="tool-link">Dutcher</span>,<span className="tool-link">Calculador</span>, Favor-Favor,{" "}
                <span className="tool-link">Multiplicador</span>,<span className="tool-link">Profit Tracker</span>)
              </p>
              <p className="feature">Cancela cuando quieras la suscripción</p>
            </div>

            <div className="card-footer">
            <Link href={safeMensualHref} style={{textDecoration:"none"}}><button style={{marginBottom:"10px"}} className="btn btn-premium">OBTÉN PREMIUM – ESPAÑA</button></Link>
            <Link href={safeMensualHref} style={{textDecoration:"none"}}><button className="btn btn-premium">OBTÉN PREMIUM – LATINOAMÉRICA</button></Link>
            </div>
          </div>

          <div className="pricing-card">
            <div className="card-header">
              <h3 className="plan-type">PREMIUM ANUAL</h3>
              <div className="price">
                <span className="amount">10€</span>
                <span className="period">/ Mes</span>
              </div>
            </div>

            <div className="card-body">
              <p className="feature">Gana hasta 500 €/US$ al Mes</p>
              <p className="feature">Acceso a todas las Guías</p>
              <p className="feature">Versión Completa de las Herramientas</p>
              <p className="feature tools">
                (<span className="tool-link">NinjaClub</span>,<span className="tool-link">Oddsmatcher</span>,
                <span className="tool-link">Dutcher</span>,<span className="tool-link">Calculador</span>, Favor-Favor,{" "}
                <span className="tool-link">Multiplicador</span>,<span className="tool-link">Profit Tracker</span>)
              </p>
              <p className="feature">Paga 120€ y Ahorra 60€</p>
            </div>

            <div className="card-footer">
            <Link href={safeAnualHref} style={{textDecoration:"none"}}><button style={{marginBottom:"10px"}} className="btn btn-premium">OBTÉN PREMIUM – ESPAÑA</button></Link>
            <Link href={safeAnualHref} style={{textDecoration:"none"}}><button className="btn btn-premium">OBTÉN PREMIUM – LATINOAMÉRICA</button></Link>
              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

