"use client"

import "./CarousellComp.css"
import AccordionTransition from "./Accordion";
const FAQ = () => {
    const dataForAcordion = [
        {
          title: "¿Realmente funciona?",
          description:
            "Si! Yes! Oui! Ja! Ayo! Lo repetimos en todos los idiomas del mundo si es necesario, ¡las apuestas combinadas ( Matched Betting) realmente funcionan! ? Te sugerimos que eches un vistazo a las ganancias generadas por nuestros usuarios.",
        },
        {
          title: "¿Cuánto dinero puedo ganar online con xxxx?",
          description:
            "Depende de cuánto tiempo dediques a esta actividad. Muchos usuarios han llegado a ganar alrededor de 500€ al mes en España y 500US$ al mes en Latinoamérica. Echa un vistazo a esta publicación que explica en detalle las ganancias que puedes generar con NinjaBet.",
        },
        {
          title: "¿Hay riesgos?",
          description:
            "Visto que apostarás a todos los resultados posibles, estás eliminando efectivamente cualquier riesgo aleatorio. El único riesgo es el error humano, como por ejemplo hacer una apuesta incorrecta. Pero si sigues nuestras instrucciones online, no podrás hacer nada más que ganar.",
        },
        {
          title: "¿Quién puede ganar online con xxxx?",
          description:
            "Si vives en España o Latinoamérica y tienes más de 18 años, puedes ganar dinero online usando nuestra plataforma. ¡Lo único que realmente importa es la determinación!",
        },
        {
          title: "¿Es legal?",
          description:
            "Sí, el Matched Betting es 100% legal. Graham Sharpe, el director de las relaciones con los medios de la casa de apuestas William Hill, entrevistado por The Telegraph, dijo: “No hay ningún elemento ilegal, los usuarios pueden usar los bonos como quieran”.",
        },
        {
          title: "Nunca he apostado en mi vida. ¿Qué hago?",
          description:
            "No hay problema. Con nuestras video guías todo se explica en la manera más simple posible y en el más mínimo detalle. También si nunca apostastes en tu vida, es fácil entender el Matched Betting.",
        },
        {
          title: "Soy un apostador, ¿tiene sentido para mí?",
          description:
            "¡Por supuesto! Puedes seguir apostando pero al mismo tiempo trabajar desde casa con el Matched Betting. Aunque si ya tienes muchas cuentas en los distintos corredores de apuestas o ya has gastado los bonos, todas las semanas salen nuevos bonos , de manera que con Ninjabet puedas ganar online cada mes.",
        },
        {
          title: "¿Debería seguir el mundo del fútbol?",
          description:
            "No es necesario porque el Matched Betting es diferente comparado con el mundo de las apuestas tradicionales. Nuestras guías permiten a todos de ganar dinero online desde casa, incluido si no sigues el mundo del fútbol.",
        },
        {
          title: "¿Necesito ser bueno en mates?",
          description:
            "No, porque nuestras herramientas harán los cálculos por ti.",
        },
        {
          title: "¿Es gratis o de pago?",
          description: "Registrarse a xxxx es gratuito",
        },
        {
          title: "Tengo más preguntas, ¿Con quién puedo contactar?",
          description:
            "Estamos siempre disponibles para aclarar cualquier pregunta sobre nuestra plataforma o sobre el Matched Betting. Para cualquier pregunta sobre el matched betting o sobre Ninjabet, pueden escribirnos un email a info@ninjabet.es, contactarnos a través del chat de nuestro sitio o también escribirnos en el NinjaClub (el foro de NinjaBet).",
        },
      ];



  const faqs = [
    "Lorem ipsum dolor sit amet?",
    "Lorem ipsum dolor sit amet?",
    "Lorem ipsum dolor sit amet?",
    "Lorem ipsum dolor sit amet?",
  ];

  return (
    <div className="faq_3">
      <div className="responsive-container-block container">
        <div className="responsive-container-block faqheading-bg">
          <div className="heading-content">
            <p className="text-blk faq-heading">Nuestras FAQS</p>
            <p className="text-blk faq-subhead">
             Lo mejor si tenes dudas acerca del matchbetting o sobre nosotros. en caso de no suplir tu duda podes contactarnos al correo
            </p>

              <AccordionTransition data={dataForAcordion} />
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default FAQ;
