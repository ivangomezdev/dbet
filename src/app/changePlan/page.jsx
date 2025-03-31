"use client"
import React, { useState } from 'react'
import NavBar from "../../components/NavBar"
import ChooseSubscriptionPlan from "../../components/ChooseSubscriptionPlan"

const subscriptionCardsData = [
    {
      planType: "FREE",
      price: "0€",
      features: [
        "Gana 120€/15US$ Sin Riesgos",
        "Acceso a 3 Guías",
        "Acceso a 3 Video Guías",
        "Versión Limitada de las Herramientas",
      ],
      buttonTextSpain: "REGÍSTRATE GRATIS",
     
      hrefSpain: "/free-spain",
      hrefLatam: "/free-latam",
    },
    {
      planType: "PREMIUM MENSUAL",
      price: "14.99€",
      period: "/ Mes",
      features: [
        "Gana hasta 500 €/US$ al Mes",
        "Acceso a todas las Guías",
        "Versión Completa de las Herramientas",
        "Cancela cuando quieras la suscripción",
      ],
      tools: ["NinjaClub", "Oddsmatcher", "Dutcher", "Calculador", "Favor-Favor", "Multiplicador", "Profit Tracker"],
      buttonTextSpain: "OBTÉN PREMIUM – ESPAÑA",
      buttonTextLatam: "OBTÉN PREMIUM – LATINOAMÉRICA",
      hrefSpain: "/premium-mensual-spain",
      hrefLatam: "/premium-mensual-latam",
    },
    {
      planType: "PREMIUM ANUAL",
      price: "10€",
      period: "/ Mes",
      features: [
        "Gana hasta 500 €/US$ al Mes",
        "Acceso a todas las Guías",
        "Versión Completa de las Herramientas",
        "Paga 120€ y Ahorra 60€",
      ],
      tools: ["NinjaClub", "Oddsmatcher", "Dutcher", "Calculador", "Favor-Favor", "Multiplicador", "Profit Tracker"],
      buttonTextSpain: "OBTÉN PREMIUM – ESPAÑA",
      buttonTextLatam: "OBTÉN PREMIUM – LATINOAMÉRICA",
      hrefSpain: "/premium-anual-spain",
      hrefLatam: "/premium-anual-latam",
    },
  ];

const page = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);

    const onPlanSelect = (planName) => {
      console.log(`Plan seleccionado: ${planName}`);
      setSelectedPlan(planName);
    };
  
  return (
    <>
      <header>
        <NavBar/>
      </header>
    <main >
        <ChooseSubscriptionPlan cardsData={subscriptionCardsData} onPlanSelect={onPlanSelect}/>
    </main>
    </>
  )
}

export default page
