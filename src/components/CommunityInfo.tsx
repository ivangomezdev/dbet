import React from "react";
import "./CommunityInfo.css";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Image from "next/image";

import Link from "next/link";
const CommunityInfo = () => {

  return (
    <div className="betting-background">
      <div className="background-overlay"></div>


      <div className="placeholder-content">
        <div className="communityInfo__cont">
          <div
          className="howToImgDiv"
            style={{
              width: "500px",
              height: "300px",
              backgroundColor: "rgba(119, 119, 119, 0.338)",
            }}
          >
            <Image
              src={
                "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742499694/hqdefault_inax8c.jpg"
              }
              alt="howTo"
              width={500}
              height={350}
              className="howToImg"
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
