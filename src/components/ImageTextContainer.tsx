import Image from "next/image";
import React from "react";
import "./imageTextContainer.css";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
const ImageTextContainer = () => {
  return (

    <div className="imageTextContainer__cont">
      <Image className="imageTextContainer__img" src={"https://res.cloudinary.com/dc5zbh38m/image/upload/v1742245582/Dise%C3%B1o_sin_t%C3%ADtulo__35_-removebg-preview_1_tz0shz.png"} alt="" width={550} height={500} />
      <div className="imageTextContainer__text">
        <div className="imageTextContainer__texts">
        <h1>Ganar Dinero Online </h1>
        <h1 style={{textAlign:"center"}}>Usando el</h1>
        <h1 style={{textAlign:"center",color:"#64D792"}}>Matched Betting</h1>
        </div>
        <div className="imageTextContainer__btnAnda">
          <Link style={{textDecoration:"none"}} href={"/auth/register"}>
        <button style={{cursor:"pointer"}} className="imageTextContainer__btn">
        <PersonIcon/>REGÍSTRATE GRATIS</button>
        </Link>
        <Link style={{textDecoration:"none"}} className="imageTextContainer__link" href={"#howWorks"}>
        Más detalles ▼
        </Link>
        </div>
      </div>
   
    </div>
  );
};

export default ImageTextContainer;
