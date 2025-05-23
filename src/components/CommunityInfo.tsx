import React from "react";
import "./CommunityInfo.css";



const CommunityInfo = () => {

  return (
    <main className="community-container">
      <section className="community-hero">
        <div className="community-hero-content">
          <h1 className="community-title">
            <span className="community-title-primary">Match Betting <span style={{color:"white"}}>Inteligente</span>
            </span>
            <span className="community-title-secondary">¿Quieres apostar como todos… o quieres ganar como nadie?</span>
          </h1>

          <p className="community-paragraph">
            Mientras el 95% de los apostadores pierde con emoción, tú puedes ganar con estructura.
            WinBet420 es la única plataforma potenciada por IA que analiza en tiempo real las oportunidades de Match Betting, comparando cuotas, promociones, mercados y riesgos para decirte cuándo actuar con precisión quirúrgica.

          </p>

          <p className="community-paragraph">
            Por eso, hemos diseñado un software líder en la industria para eliminar el trabajo pesado de la conversión
            de promociones e incluimos una biblioteca de guías y atención al cliente experta para que ganar dinero con
            las promociones sea muy fácil, sin importar su nivel de experiencia.
          </p>
        </div>

        <div className="community-hero-image">
      {/*  <Image
            src="https://res.cloudinary.com/dllkefj8m/image/upload/v1746051078/easda_ou1mtr.png"
            alt="Software con métricas financieras"
            width={390}
            height={250}
            className="community-main-image"
          />*/}
          <video src="https://res.cloudinary.com/dllkefj8m/video/upload/v1747254016/Image_to_video_%E4%B8%A8_genera_una_animaci%C3%B3n_en_el_robot._a_su_entorno_y_a_la_pc_dejalo..._xjsf8h.mp4" loop muted autoPlay className="community-main-image"></video>
        
        </div>
      </section>


    </main>
  );
};

export default CommunityInfo;
