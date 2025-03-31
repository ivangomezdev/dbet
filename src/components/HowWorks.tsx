import React from "react";
import "./howWorks.css";
import Card from "./Card";
const HowWorks = () => {
  const howWorksCards = [
    {
      src: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742334432/BRAIN_tfew9b.png",
      alt:"brain",
      
      title: "¿QUÉ ES EL MATCHED BETTING?",
      description:
        "Cada año, los sitios de apuestas distribuyen millones de euros en bonos para incrementar las apuestas de sus usuarios. El Matched Betting (o Come Bonus) es una técnica matemática utilizada para convertir estos bonos en dinero real.",
    },
    {
      src: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742334433/Dise%C3%B1o_sin_t%C3%ADtulo__37_-removebg-preview_wzfouo.png",
      alt:"",
      
      title: "¿ES UN JUEGO DE AZAR?",
      description:
        "El Matched Betting no tiene nada que ver con el juego de azar, visto que no conlleva ningún riesgo. Consiste en aplicar reglas matemáticas que anulan el elemento aleatorio asociado al azar, garantizando las ganancias.",
    },
    {
      src: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742334432/team_wf0us5.png",
      alt:"",
      
      title: "¿QUIÉNES LO ESTÁN USANDO?",
      description:
        "Nuestro servicio ha sido muy apreciado en toda España y Latinoamérica. Nuestra comunidad incluye estudiantes universitarios, amas de casa y trabajadores. Todos con el mismo objetivo: Ganar dinero online.",
    },
    {
      src: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1742334432/cup-1_iakbam.png",
      alt:"",
      buttonText:"COMIENZA AHORA ➡",
      title: "¿CÓMO PUEDO PROBARLO?",
      description:
        "¡Puedes registrarse gratis y comenzar a ganar tus primeros 120€ en España o 15US$ en Latinoamérica sin ningún compromiso! No tienes nada que perder, pero muchísimo que ganar. ¡Únete a nuestra comunidad ahora y conviértete en un Ninja!",
    },
  ];
  return (
    <div className="howWorks__content" id="howWorks">
      <h1 className="thirdline">¿Cómo Funciona xxxx?</h1>
      <div className="howWorks__cards">
      <Card cardContent={howWorksCards}/>
  
      </div>
    </div>
  );
};

export default HowWorks;
