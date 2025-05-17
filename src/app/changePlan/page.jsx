"use client";

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import ChooseSubscriptionPlan from "../../components/ChooseSubscriptionPlan";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useSession } from "next-auth/react";
import "../guides/guides.css";

// Datos de los planes, alineados con el backend
const cardsData = [
  {
    planType: "FREE",
    price: "$0",
    period: "/mes",
    features: ["Bonos"],
    buttonTextSpain: "Seleccionar",
    buttonTextLatam: "Seleccionar (Latam)",
    hrefSpain: "#",
    hrefLatam: "#",
  },
  {
    planType: "PREMIUM MENSUAL",
    price: "$10", // Ajusta según el precio real
    period: "/mes",
   features: ["Gana hasta 500 €/US$ al Mes", "Acceso a todas las Guías", "Versión Completa de las Herramientas"],
    tools: ["Bonos", "AutoMBetting", "OddsMatcher"],
    buttonTextSpain: "Comprar",
 buttonTextLatam: "Comprar LATAM (Próximamente)",
    hrefSpain: "#",
    hrefLatam: "#",
  },
  {
    planType: "PREMIUM ANUAL",
    price: "$100", // Ajusta según el precio real
    period: "/año",
    features: ["Gana hasta 500 €/US$ al Mes", "Acceso a todas las Guías", "Versión Completa de las Herramientas"],
    tools: ["Bonos", "AutoMBetting", "OddsMatcher"],
    buttonTextSpain: "Comprar",
    buttonTextLatam: "Comprar LATAM (Próximamente)",
    hrefSpain: "#",
    hrefLatam: "#",
  },
];

const Page = () => {
  const [cookies] = useCookies(["token"]);
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);

  // Determinar si el usuario está autenticado
  const isAuthenticated = !!session || !!cookies.token;

  // Obtener datos del usuario para autenticación basada en token
  useEffect(() => {
    const fetchUserData = async () => {
      if (cookies.token && !session) {
        try {
          const response = await fetch("/api/user", {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUserData(data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, [cookies.token, session]);

  // Determinar el estado de la suscripción
  const subscriptionStatus = session?.user?.subscriptionStatus || userData?.subscriptionStatus || "inactive";
  const isFreePlan = subscriptionStatus === "FREE";

  // Función para manejar la selección del plan
  const handlePlanSelect = (planName) => {
    console.log(`Plan seleccionado: ${planName}`);
    // Agrega lógica adicional si es necesario (por ejemplo, analíticas o redirección)
  };

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="guides__main bonos__content">
        <ChooseSubscriptionPlan cardsData={cardsData} onPlanSelect={handlePlanSelect} />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Page;