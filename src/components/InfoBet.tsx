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
                  src="https://res.cloudinary.com/dllkefj8m/image/upload/v1746462674/bonos_c8o19t.png"
                  alt="Bonos de bienvenida"
                  width={220}
                  height={130}
                  className="feature-image"
                />
                <Image
                  src="https://res.cloudinary.com/dllkefj8m/image/upload/v1746462674/bonos2_lys7yl.png"
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
                src="https://res.cloudinary.com/dllkefj8m/image/upload/v1746462674/odds_msizon.png"
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
                <h3> <span className="number-circle">2</span>Auto Mbetting</h3>
                <p>
                 Relajate mientras nuestros profesionales generan dinero por tí. ideal para quienes no conocen de matchbetting. Reduce los riesgos a 0 y empieza a ganar con nosotross
                </p>
              </div>
            </div>
            <div className="feature-images">
              <video
                src="https://res.cloudinary.com/dllkefj8m/video/upload/v1746466426/Image_to_video_%E4%B8%A8_haz_que_este_personaje_se_mueva_uktjao.mp4"
                width={190}
                height={130}
                className="feature-imageVideo"
                autoPlay
                muted
                loop
             
              />
            </div>
          </div>
        </div>

        {/* NinjaClub */}
       
       
      </div>
    </div>
  )
}