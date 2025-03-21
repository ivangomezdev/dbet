import Image from "next/image";
import "./card.css";
import Link from "next/link";

type CardData = {
  title: string;
  src: string;
  alt: string;
  description: string;
  buttonText?: string;
}[];

// Define una interfaz para las props del componente
interface CardProps {
  cardContent: CardData;
}

export default function Card({ cardContent }: CardProps) {
  return (
    <div className="card-container">
      {cardContent.map((i, index) => {
        return (
          <div key={index} className="card">
            <div className="side-bar">
              <div className="gravity-text">LOGO O NOMBRE</div>
            </div>
            <div className="card-content">
              <h2 className="card-title">{i.title}</h2>

              <div className="profile-image-container">
                <Image
                  src={i.src}
                  alt={i.alt}
                  width={150}
                  height={150}
                  className="profile-image"
                />
              </div>

              <p className="card-description">{i.description}</p>

              <div className="school-logo">
                {i.buttonText ? <Link style={{textDecoration:"none"}} href={"/auth/register"}> <button style={{cursor:"pointer"}} className="card-registerBtn">{i.buttonText}</button> </Link> : <></>}
                
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}