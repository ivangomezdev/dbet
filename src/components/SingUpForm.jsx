// pages/signup.js
"use client";

import { useEffect, useState } from "react";
import "./singUpForm.css";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import ChooseSubscriptionPlan from "./ChooseSubscriptionPlan";
import { useSetAtom } from "jotai";
import { userAtom } from "@/lib/atom";
import GoogleSignInButton from "./GoogleSignButton";

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
    buttonTextLatam: "REGÍSTRATE GRATIS",
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

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [errorCode, setErrorCode] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);
  const [subscriptionState, setSubscriptionState] = useState(null);
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState("");
  const [showInitialForm, setShowInitialForm] = useState(true); // Nuevo estado
  const setUserData = useSetAtom(userAtom)
  
  const handlePlanSelection = (planName) => {
    setSelectedPlan(planName);
  
  };

  const updateSubscription = async (plan,email) =>{
    console.log(plan,email, "RECIBIDO DESDE PC");
    
    try {
      const response = await fetch('/api/me/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.token}`,
        },
        body: JSON.stringify({
         plan,
         email
        }),
      });
      const data = await response.json();
       console.log(plan,email, "ESTO LE ESTOY PASANDO DESDE UPDATE  SUBSCRIPT");
      console.log(data,"RESPUESTA DEL SERVIDOR");
      
    } catch {
      setError("err.message");
    }
  
  }


  useEffect(() => {
    if (selectedPlan === "FREE") {
      updateSubscription("FREE",email)
    }
  }, [selectedPlan]);

  useEffect(() => {
    if (cookies.token && subscriptionState !== "inactive") {
      router.push("/me");
    }
  }, [cookies.token, router, subscriptionState]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.subscriptionStatus) {
        setSubscriptionState(data.subscriptionStatus);
        setUserData(data.subscriptionStatus)
      
        
      }

      if (!response.ok) {
        throw new Error(data.error || "Algo salió mal");
      }

      setShowCodeInput(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    const codeVal = e.target.code.value;
    try {
      const response = await fetch("/api/signup/code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codeVal, email }),
      });

      if (!response.ok) {
        setErrorCode(true);
        throw new Error("Código inválido");
      }

      const { token } = await response.json();
      setCookie("token", token, { path: "/" });

      if (subscriptionState === "inactive") {
        setShowSubscription(true);
        setShowInitialForm(false); // Ocultar elementos iniciales
      }

      setErrorCode(false);
    } catch (err) {
      console.log("Error al verificar el código:", err);
    }
  };

  return (
    <div className="signup">
      <div className="signup__container">
        {showInitialForm && (
          <>
            <h1 className="signup__title">¡Bienvenido!</h1>
            <p className="signup__social-text">Regístrate con GOOGLE</p>

            <div className="signup__social-buttons">
        
            <GoogleSignInButton/>
            </div>

            <p className="signup__divider">O utiliza tu email</p>
          </>
        )}

        {showSubscription ? (
          <ChooseSubscriptionPlan cardsData={subscriptionCardsData} onPlanSelect={handlePlanSelection} />
        ) : (
          <form className="signup__form" onSubmit={showCodeInput ? handleCodeSubmit : handleSubmit}>
            {error && <p className="signup__error">{error}</p>}

            <div className="signup__form-group">
              <label htmlFor="email" className="signup__label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="signup__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={showCodeInput || loading}
              />
            </div>

            {showCodeInput && (
              <div className="signup__form-group">
                <label htmlFor="code" className="signup__label">
                  Ingresa el código enviado por email:
                </label>
                {errorCode && <p style={{ color: "red" }}>El código ingresado es incorrecto</p>}
                <input
                  type="text"
                  id="code"
                  name="code"
                  className="signup__input"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            )}

            <button type="submit" className="signup__submit-button" disabled={loading}>
              {loading ? "Procesando..." : showCodeInput ? "Confirmar Código" : "Regístrate"}
            </button>
          </form>
        )}

        <div className="signup__footer">
          <a href="#" className="signup__link">
            Términos y Condiciones
          </a>
          <span className="signup__separator">|</span>
          <a href="#" className="signup__link">
            Política de Privacidad
          </a>
        </div>
      </div>
    </div>
  );
}
// Agregar SSR para manejar la redirección en el servidor
export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.token;

  if (token) {
    return {
      redirect: {
        destination: "/me",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}