import React from "react";
import "./ReviewsBet.css";
import Image from "next/image";
function ReviewsBet() {
  return (
    <div className="reviews-bet">
      <div className="reviews-bet__container">
        <h2 className="reviews-bet__title">
          YA HEMOS AYUDADO A 500.000 MIEMBROS{" "}
          <span className="reviews-bet__title--highlight">
            A OBTENER GANANCIAS DE LAS PROMOCIONES
          </span>
        </h2>

        <div className="reviews-bet__features">
          <div className="reviews-bet__feature">
            <div className="reviews-bet__stars">★★★★★</div>
            <h3 className="reviews-bet__feature-title">Estrategias probadas</h3>
            <p className="reviews-bet__feature-description">Probado y comprobado</p>
          </div>

          <div className="reviews-bet__feature">
            <div className="reviews-bet__stars">★★★★★</div>
            <h3 className="reviews-bet__feature-title">El mejor software</h3>
            <p className="reviews-bet__feature-description">Potente y rápido</p>
          </div>

          <div className="reviews-bet__feature">
            <div className="reviews-bet__stars">★★★★★</div>
            <h3 className="reviews-bet__feature-title">Soporte de clase mundial</h3>
            <p className="reviews-bet__feature-description">Amable y conocedor</p>
          </div>

          <div className="reviews-bet__feature">
            <div className="reviews-bet__stars">★★★★★</div>
            <h3 className="reviews-bet__feature-title">Negocio de confianza</h3>
            <p className="reviews-bet__feature-description">Con la confianza de nuestros usuarios</p>
          </div>

          <div className="reviews-bet__feature">
            <div className="reviews-bet__stars">★★★★★</div>
            <h3 className="reviews-bet__feature-title">Comunidades prósperas</h3>
            <p className="reviews-bet__feature-description">Conéctate con otros usuarios de Facebook.</p>
          </div>

          <div className="reviews-bet__feature">
            <div className="reviews-bet__stars">★★★★★</div>
            <h3 className="reviews-bet__feature-title">Programa de afiliados</h3>
            <p className="reviews-bet__feature-description">Con todo el apoyo de nuestros expertos</p>
          </div>
        </div>

        <div className="reviews-bet__platforms">
          <div className="reviews-bet__platform">
            <div className="reviews-bet__platform-logo reviews-bet__platform-logo--reviews"><Image style={{position:"relative",top:"30px"}} src={"https://res.cloudinary.com/dllkefj8m/image/upload/v1745955651/renew_ztzezq.svg"} width={130} height={100} /></div>
            <div className="reviews-bet__platform-stars">
              <span className="reviews-bet__platform-starColorViolet">★</span>
              <span className="reviews-bet__platform-starColorViolet">★</span>
              <span className="reviews-bet__platform-starColorViolet">★</span>
              <span className="reviews-bet__platform-starColorViolet">★</span>
              <span className="reviews-bet__platform-starColorViolet">★</span>
            </div>
            <div className="reviews-bet__platform-rating">
              <span className="reviews-bet__platform-score">4.8</span>
              <span className="reviews-bet__platform-max">/5</span>
            </div>
            <div className="reviews-bet__platform-count">basado en más de 780 reseñas</div>
          </div>

          <div className="reviews-bet__platform">
            <div className="reviews-bet__platform-logo reviews-bet__platform-logo--trustpilot"><Image style={{position:"relative",top:"30px"}} src={"https://res.cloudinary.com/dllkefj8m/image/upload/v1745955651/trust_zv5s8y.svg"} width={130} height={100} /></div>
            <div className="reviews-bet__platform-stars">
              <span className="reviews-bet__platform-starColor">★</span>
              <span className="reviews-bet__platform-starColor">★</span>
              <span className="reviews-bet__platform-starColor">★</span>
              <span className="reviews-bet__platform-starColor">★</span>
              <span className="reviews-bet__platform-starColor">★</span>
            </div>
            <div className="reviews-bet__platform-rating">
              <span className="reviews-bet__platform-score">4.8</span>
              <span className="reviews-bet__platform-max">/5</span>
            </div>
            <div className="reviews-bet__platform-count">basado en más de 560 reseñas</div>
          </div>
        </div>

      
      </div>
    </div>
  );
}

export default ReviewsBet;
