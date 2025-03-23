import React from "react";
import "./CommunityInfo.css";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Image from "next/image";

import Link from "next/link";
const CommunityInfo = () => {

  return (
    <div className="betting-background">
      <div className="background-overlay"></div>

      {/* Trofeos */}
      <div className="trophy trophy-large">
        <Image
          src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1742345817/thropy-removebg-preview_xhqa4y.png"
          alt="Trofeo dorado"
          width={100}
          height={150}
          className="trophy-image"
        />
      </div>

      <div className="trophy trophy-medium">
        <Image
          src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1742345817/thropy-removebg-preview_xhqa4y.png"
          alt="Trofeo plata"
          width={80}
          height={120}
          className="trophy-image"
        />
      </div>

      <div className="trophy trophy-small">
        <Image
          src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1742345817/thropy-removebg-preview_xhqa4y.png"
          alt="Trofeo bronce"
          width={60}
          height={90}
          className="trophy-image"
        />
      </div>

      {/* Elementos de dinero */}
      <div className="money-elements">
        <div className="coin coin-1"></div>

        <div className="coin coin-5"></div>
        <div className="coin coin-6"></div>

        <div className="bill bill-1"></div>
        <div className="bill bill-2"></div>
        <div className="bill bill-3"></div>

        <div className="chip chip-1"></div>

        <div className="chip chip-3"></div>
      </div>

      {/* Elementos deportivos */}
      <div className="sports-elements">
        <div className="ball football"></div>
        <div className="ball basketball"></div>

        <div className="ball baseball"></div>
      </div>

      <div className="placeholder-content">
        <div className="communityInfo__cont">
          <div
            style={{
              width: "600px",
              height: "300px",
              backgroundColor: "rgba(119, 119, 119, 0.338)",
            }}
          >
            <Image
              src={
                "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742499694/hqdefault_inax8c.jpg"
              }
              alt="howTo"
              width={600}
              height={350}
            />
          </div>
          <div className="communityInfo__text">
            <h1>¡Únete a la Community de xxxx!</h1>
            <p>
              xxxx es la primera community en España y Latinoamérica que te
              ayuda a ganar un sueldo alternativo gracias al Matched Betting.
            </p>
            <p>
              Regístrate gratis y gana tus primeros 120€ en España o 15US$ en
              Latinoamérica.
            </p>
            <strong>¡Garantizados!</strong>
            <Link  href={"/auth/register"}>
            <button style={{cursor:"pointer"}}>
              {" "}
              COMIENZA AHORA <ArrowCircleRightIcon fontSize="medium" />{" "}
            </button>
            </Link>
          </div>
          <div className="communityInfo__quantity">
            <h1>100,000,000€+</h1>
            <p>
              Generados por nuestros usuarios 😉{" "}
              <a href="">
                Haz clic aquí para ver las ganancias de nuestros usuarios ►
              </a>
            </p>
          </div>

          <div className="communityInfo__info">
            <Image
              src={
                "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742344752/asd-removebg-preview_1_xo7fir.png"
              }
              width={200}
              height={200}
              alt="Latam"
            />
            <p>
              La primera plataforma de Matched Betting en España y Latinoamérica
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityInfo;
