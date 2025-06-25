import Image from "next/image";
import React from "react";
import "./imageTextContainer.css";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import NavBar from "./HeroNavBar";



const ImageTextContainer = () => {
  return (
    <div className="imageTextContainer__cont">
      {/* FogEffect is now inside the container */}
        <NavBar/>
      <div className="background-video-container">
    <video
    autoPlay
    muted
    loop
    preload="auto"
    src="https://res.cloudinary.com/dufp4z4gq/video/upload/v1750879964/american_rtjsva.mp4"
    className="background-video"
    />
     
  </div>
      <Image
        className="imageTextContainer__img"
        src={
          "https://res.cloudinary.com/dllkefj8m/image/upload/v1746720234/negro_1_zwo7ky.png"
        }
        alt=""
        width={600}
        height={550}
      />
    
     
      <div className="imageTextContainer__text">
     
        <div className="imageTextContainer__texts">
          <h1>¿Aun no ganas dinero en internet? </h1>
          <h1 style={{ textAlign: "center" }}><span style={{color:"#F1F1F1",marginTop:"100px"}}>Prueba </span> </h1>
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
            Empieza ahora ▼
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ImageTextContainer;
