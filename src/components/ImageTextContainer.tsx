import Image from "next/image";
import React from "react";
import "./imageTextContainer.css";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import FogEffect from "./ImageTextContainerPrueba"; // Assuming this is the correct import path
import LightningEffect from "./Lightining";

const ImageTextContainer = () => {
  return (
    <div className="imageTextContainer__cont">
      {/* FogEffect is now inside the container */}
      <FogEffect />
      <Image
        className="imageTextContainer__img"
        src={
          "https://res.cloudinary.com/dc5zbh38m/image/upload/v1743412711/jugador-futbol-americano-juego-accion-fondo-estadio-futbol_741910-17466-removebg-preview_qi1nwx.png"
        }
        alt=""
        width={700}
        height={600}
      />
      <div className="imageTextContainer__text">
        <div className="imageTextContainer__texts">
          <h1>Ganar Dinero Online</h1>
          <h1 style={{ textAlign: "center" }}>Usando el</h1>
          <h1 className="thirdline" style={{ textAlign: "center" }}>
            Matched Betting
          </h1>
        </div>
        <div className="imageTextContainer__btnAnda">
          <Link style={{ textDecoration: "none" }} href={"/auth/register"}>
            <button style={{ cursor: "pointer" }} className="imageTextContainer__btn">
              <PersonIcon /> REGÍSTRATE GRATIS
            </button>
          </Link>
          <Link
            style={{ textDecoration: "none" }}
            className="imageTextContainer__link"
            href={"#howWorks"}
          >
            Más detalles ▼
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ImageTextContainer;
