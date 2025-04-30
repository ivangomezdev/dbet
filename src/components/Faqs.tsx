"use client"

import { useState } from "react"
import "./Faqs.css"

function Faqs() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const dataForAcordion = [
    {
      title: "¿Realmente funciona?",
      description:
        "Si! Yes! Oui! Ja! Ayo! Lo repetimos en todos los idiomas del mundo si es necesario, ¡las apuestas combinadas ( Matched Betting) realmente funcionan! ? Te sugerimos que eches un vistazo a las ganancias generadas por nuestros usuarios.",
    },
    {
      title: "¿Cuánto dinero puedo ganar online con winbet420?",
      description:
        "Depende de cuánto tiempo dediques a esta actividad. Muchos usuarios han llegado a ganar alrededor de 500€ al mes en España y 500US$ al mes en Latinoamérica. Echa un vistazo a esta publicación que explica en detalle las ganancias que puedes generar con winbet420.",
    },
    {
      title: "¿Hay riesgos?",
      description:
        "Visto que apostarás a todos los resultados posibles, estás eliminando efectivamente cualquier riesgo aleatorio. El único riesgo es el error humano, como por ejemplo hacer una apuesta incorrecta. Pero si sigues nuestras instrucciones online, no podrás hacer nada más que ganar.",
    },
    {
      title: "¿Quién puede ganar online con winbet420?",
      description:
        "Si vives en España o Latinoamérica y tienes más de 18 años, puedes ganar dinero online usando nuestra plataforma. ¡Lo único que realmente importa es la determinación!",
    },
    {
      title: "¿Es legal?",
      description:
        "Sí, el Matched Betting es 100% legal. Graham Sharpe, el director de las relaciones con los medios de la casa de apuestas William Hill, entrevistado por The Telegraph, dijo: &quot;No hay ningún elemento ilegal, los usuarios pueden usar los bonos como quieran&quot;.",
    },
    {
      title: "Nunca he apostado en mi vida. ¿Qué hago?",
      description:
        "No hay problema. Con nuestras video guías todo se explica en la manera más simple posible y en el más mínimo detalle. También si nunca apostastes en tu vida, es fácil entender el Matched Betting.",
    },
    {
      title: "Soy un apostador, ¿tiene sentido para mí?",
      description:
        "¡Por supuesto! Puedes seguir apostando pero al mismo tiempo trabajar desde casa con el Matched Betting. Aunque si ya tienes muchas cuentas en los distintos corredores de apuestas o ya has gastado los bonos, todas las semanas salen nuevos bonos , de manera que con winbet420 puedas ganar online cada mes.",
    },
    {
      title: "¿Debería seguir el mundo del fútbol?",
      description:
        "No es necesario porque el Matched Betting es diferente comparado con el mundo de las apuestas tradicionales. Nuestras guías permiten a todos de ganar dinero online desde casa, incluido si no sigues el mundo del fútbol.",
    },
    {
      title: "¿Necesito ser bueno en mates?",
      description: "No, porque nuestras herramientas harán los cálculos por ti.",
    },
    {
      title: "¿Es gratis o de pago?",
      description: "Registrarse a winbet420 es gratuito",
    },
    {
      title: "Tengo más preguntas, ¿Con quién puedo contactar?",
      description:
        "Estamos siempre disponibles para aclarar cualquier pregunta sobre nuestra plataforma o sobre el Matched Betting. Para cualquier pregunta sobre el matched betting o sobre winbet420, pueden escribirnos un email a info@winbet420.es, contactarnos a través del chat de nuestro sitio o también escribirnos en el winbet420Club (el foro de winbet420).",
    },
  ]

  return (
    <div className="faqs">
      <div className="faqs__container">
        
        <h2 className="faqs__title">NUESTRAS FAQS</h2>

        <div className="faqs__accordion">
          {dataForAcordion.map((item, index) => (
            <div key={index} className={`faqs__item ${openIndex === index ? "faqs__item--open" : ""}`}>
              <button
                className="faqs__question"
                onClick={() => toggleAccordion(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                {item.title}
                <span className="faqs__icon">{openIndex === index ? "−" : "+"}</span>
              </button>
              <div
                id={`faq-answer-${index}`}
                className="faqs__answer"
                style={{
                  maxHeight: openIndex === index ? "1000px" : "0",
                  opacity: openIndex === index ? "1" : "0",
                }}
              >
                <div className="faqs__answer-content">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Faqs
