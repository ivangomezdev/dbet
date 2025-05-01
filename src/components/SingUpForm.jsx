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
  const [showInitialForm, setShowInitialForm] = useState(true);
  const setUserData = useSetAtom(userAtom);

  const handlePlanSelection = (planName) => {
    setSelectedPlan(planName);
  };

  const updateSubscription = async (plan, email) => {
    console.log(plan, email, "RECIBIDO DESDE PC");

    try {
      const response = await fetch('/api/me/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.token}`,
        },
        body: JSON.stringify({
          plan,
          email,
        }),
      });
      const data = await response.json();
    } catch {
      setError("err.message");
    }
  };

  useEffect(() => {
    if (selectedPlan === "FREE") {
      updateSubscription("FREE", email);
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
        setUserData(data.subscriptionStatus);
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
        setShowInitialForm(false);
      }

      setErrorCode(false);
    } catch (err) {
      console.log("Error al verificar el código:", err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {showInitialForm && (
          <>
            <h1 className="auth-title">Let's Start Learning</h1>
            <p className="auth-subtitle">Please login or signup to continue</p>
          </>
        )}

        {showSubscription ? (
          <ChooseSubscriptionPlan cardsData={subscriptionCardsData} onPlanSelect={handlePlanSelection} />
        ) : (
          <form className="signup__form" onSubmit={showCodeInput ? handleCodeSubmit : handleSubmit}>
            {error && <p className="auth-error">{error}</p>}

            <div className="input-group">
              <span className="input-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12H8m4-4v8m-7 4h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <input
                type="email"
                id="email"
                className="auth-input"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={showCodeInput || loading}
              />
            </div>

            {showCodeInput && (
              <div className="input-group">
                <label htmlFor="code" className="code-label">
                  Enter the code sent to your email:
                </label>
                {errorCode && <p className="auth-error">The entered code is incorrect</p>}
                <input
                  type="text"
                  id="code"
                  name="code"
                  className="auth-input"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            )}

            <button
              type="submit"
              className="auth-button primary"
              disabled={loading}
            >
              {loading ? "Processing..." : showCodeInput ? "Confirm Code" : "Sign Up"}
            </button>

            {showInitialForm && (
              <>
                <button type="button" className="auth-button google">
                  <GoogleSignInButton />
                </button>
              </>
            )}
          </form>
        )}

        <div className="signup__footer">
          <a href="#" className="signup__link">
            Terms and Conditions
          </a>
          <span className="signup__separator">|</span>
          <a href="#" className="signup__link">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
}

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