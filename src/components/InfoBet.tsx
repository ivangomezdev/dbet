import Image from "next/image"
import "./infoBet.css"

export default function InfoBet() {
  return (
    <div className="info-bet-container">
      

      {/* Wave background at bottom */}
      <div className="wave-background"></div>

      <div className="content-container">
        {/* Header */}
        <div className="header">
          <h1 className="thirdlineColor">Te Ofrece Todas Las Herramientas</h1>
          <p>para empezar a ganar dinero online ahora de la forma mas facil!
          </p>
        </div>

        {/* Features */}
        <div className="features">
          {/* Bonos */}
          <div className="feature-item">
            <div className="feature-text">

              
              <div>
                
              
                <h3 > <span className="number-circle">2</span> Bonos</h3>
              
                <p>
                  Encuentra todos los bonos de bienvenida y promociones disponibles para nuevos usuarios de forma rápida
                  y sencilla. Compara las ofertas de las diferentes casas de apuestas y elige la mejor.
                </p>
              </div>
            </div>
            <div className="feature-images">
              <div className="images-container">
                <Image
                  src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1742504453/bonoshome2_rj0quy.png"
                  alt="Bonos de bienvenida"
                  width={220}
                  height={130}
                  className="feature-image"
                />
                <Image
                  src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1742504453/bonos-home_vjgtl4.png"
                  alt="Promociones"
                  width={220}
                  height={130}
                  className="feature-image"
                />
              </div>
            </div>
          </div>



          {/* Calculadora y Multiplicador */}
          <div className="feature-item">
            <div className="feature-text">

         
         
              <div>
            
                  <h3> <span className="number-circle">2</span>  El Calculador y El Multiplicador</h3>
                <p>
                  Optimiza tus apuestas y calcula el valor de tus cuotas utilizando nuestra calculadora de apuestas
                  avanzada. Perfecto para el lay y hedge betting para obtener ganancias garantizadas.
                </p>
              </div>
            </div>
            <div className="feature-images">
              <Image
                src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1742504530/calculador-home_walwvi.png"
                alt="Calculadora de apuestas"
                width={220}
                height={130}
                className="feature-image"
                 
              />
            </div>
          </div>

          {/* Profit Tracker */}
          <div className="feature-item">
            <div className="feature-text">

              
       
              <div>
                <h3> <span className="number-circle">2</span> El Profit Tracker</h3>
                <p>
                  Controla tus ganancias y mantén un registro detallado de todas tus apuestas. Analiza tus resultados y
                  mejora tu estrategia con el seguimiento de tus ganancias y pérdidas en tiempo real.
                </p>
              </div>
            </div>
            <div className="feature-images">
              <Image
                src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1742504528/profit-tracker-ninjabet-es_f1tyg0.png"
                alt="Seguimiento de ganancias"
                width={220}
                height={130}
                className="feature-image"
                style={{border:"none"}}
              />
            </div>
          </div>
        </div>

        {/* NinjaClub */}
       
       
      </div>
    </div>
  )
}