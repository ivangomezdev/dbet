import Image from "next/image"
import "./infoBet.css"

export default function InfoBet() {
  return (
    <div className="info-bet-container">
      {/* Background dots */}
      <div className="dot dot-1"></div>
      <div className="dot dot-2"></div>
      <div className="dot dot-3"></div>
      <div className="dot dot-4"></div>
      <div className="dot dot-5"></div>
      <div className="dot dot-6"></div>

      {/* Wave background at bottom */}
      <div className="wave-background"></div>

      <div className="content-container">
        {/* Header */}
        <div className="header">
          <h1>xxxx Te Ofrece Todas Las Herramientas</h1>
          <p>que necesitas para ganar dinero online de manera rápida y eficiente</p>
        </div>

        {/* Features */}
        <div className="features">
          {/* Bonos */}
          <div className="feature-item">
            <div className="feature-text">
              <div className="feature-number">
                <div className="number-circle">1</div>
              </div>
              <div>
                <h3>Bonos</h3>
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
                  width={250}
                  height={150}
                  className="feature-image"
                />
                <Image
                  src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1742504453/bonos-home_vjgtl4.png"
                  alt="Promociones"
                  width={250}
                  height={150}
                  className="feature-image"
                />
              </div>
            </div>
          </div>

          {/* Oddscrawler y Oddminer */}
          <div className="feature-item">
            <div className="feature-text">
              <div className="feature-number">
                <div className="number-circle">2</div>
              </div>
              <div>
                <h3>El Oddscrawler y El Oddminer</h3>
                <p>
                  Utiliza nuestras herramientas de comparación de cuotas para encontrar las mejores oportunidades de
                  valor en el mercado. Te permite ver las cuotas de diferentes casas de apuestas para un mismo evento y
                  elegir la mejor opción.
                </p>
              </div>
            </div>
            <div className="feature-images">
              <Image
                src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1742504530/oddsmatcher-home_kgou3x.png"
                alt="Comparador de cuotas"
                width={530}
                height={150}
                className="feature-image-quotes"
                style={{border:"none"}}
              />
            </div>
          </div>

          {/* Calculadora y Multiplicador */}
          <div className="feature-item">
            <div className="feature-text">
              <div className="feature-number">
                <div className="number-circle">3</div>
              </div>
              <div>
                <h3>El Calculador y El Multiplicador</h3>
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
                width={300}
                height={150}
                className="feature-image"
                  style={{border:"none"}}
              />
            </div>
          </div>

          {/* Profit Tracker */}
          <div className="feature-item">
            <div className="feature-text">
              <div className="feature-number">
                <div className="number-circle">4</div>
              </div>
              <div>
                <h3>El Profit Tracker</h3>
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
                width={300}
                height={150}
                className="feature-image"
                style={{border:"none"}}
              />
            </div>
          </div>
        </div>

        {/* NinjaClub */}
        <div className="ninja-club">
          <h2>El xxxx Club (beta)</h2>
          <p>
            Únete a nuestra comunidad de apostadores y comparte tus estrategias y consejos. Aprende de los mejores y
            mejora tus resultados.
          </p>

          <div className="club-image-container">
            <Image
              src="/placeholder.svg?height=300&width=600"
              alt="community"
              width={600}
              height={300}
              className="club-image"
            />
          </div>
        </div>
      </div>
    </div>
  )
}