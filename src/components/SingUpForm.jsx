"use client";

import { useEffect, useState } from "react";
import "./singUpForm.css";
import SubscriptionCard from "./SubscriptionCard";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [errorCode, serErrorCode] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);
  const router = useRouter(); // Add router

  useEffect(() => {
    console.log("Cookies:", cookies);
    console.log("Token:", cookies.token);
    if (cookies.token ) {
      router.push("/me");
    }
  }, [cookies.token, router]);


  
  //crear o buscar usuario y enviar codigo
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Algo salió mal");
      }

      // Bloquear email y mostrar campo de código
      setShowCodeInput(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cookies.token) {
      //redirige si ya estoy logueado
      router.push("/me");
    }
  }, [cookies.token]);

  //manejar codigo y tomar el TOKEN para pasarlo a las cookies
  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    const codeVal = e.target.code.value;
    try {
      const response = await fetch("/api/signup/code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ codeVal, email }),
      });

      if (!response.ok) {
        serErrorCode(true);
      }

      if (response.ok) {
        const { token } = await response.json();
        setCookie("token",token);
        console.log(cookies);

        setShowSubscription(true);
      }
    } catch (err) {
      console.log(err);
    }

    if (showSubscription) {
      return (
        <SubscriptionCard
          hrefAnual="/auth/register"
          hrefMensual="/auth/register"
          hrefFree="/auth/register"
        />
      );
    }
  };

  return (
    <div className="signup">
      <div className="signup__container">
        <h1 className="signup__title">¡Bienvenido!</h1>
        <p className="signup__social-text">
          Regístrate con una de tus redes sociales
        </p>

        <div className="signup__social-buttons">
          <button className="signup__social-button signup__social-button--facebook">
            <span className="signup__social-icon">f</span>
          </button>
          <button className="signup__social-button signup__social-button--twitter">
            <span className="signup__social-icon">X</span>
          </button>
          <button className="signup__social-button signup__social-button--google">
            <span className="signup__social-icon">G</span>
          </button>
        </div>

        <p className="signup__divider">O utiliza tu email</p>

        <form
          className="signup__form"
          onSubmit={showCodeInput ? handleCodeSubmit : handleSubmit}
        >
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
              {errorCode && (
                <p style={{ color: "red" }}>
                  El código ingresado es incorrecto
                </p>
              )}
              <input
                type="text"
                id="code"
                className="signup__input"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          )}

          <button
            type="submit"
            className="signup__submit-button"
            disabled={loading}
          >
            {loading
              ? "Procesando..."
              : showCodeInput
              ? "Confirmar Código"
              : "Regístrate"}
          </button>
        </form>

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