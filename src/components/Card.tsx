"use client"

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
      {cardContent.map((card, index) => (
        <div key={index} className="card">
          <div className="side-bar">
            <div className="icon-container">
              <span className="icon">¿?</span>
            </div>
          </div>
          <div className="card-content">
            <h2 className="card-title">{card.title}</h2>

            <p className="card-description">{card.description}</p>

            {card.buttonText && (
              <div className="button-container">
                <Link href="/auth/register" style={{ textDecoration: "none" }}>
                  <button className="card-registerBtn">{card.buttonText}</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      ))}

      
    </div>
  )
}

