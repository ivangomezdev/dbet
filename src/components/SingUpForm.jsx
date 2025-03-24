// pages/signup.js
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
  const [errorCode, setErrorCode] = useState(false); // Corregí `serErrorCode` a `setErrorCode`
  const [showSubscription, setShowSubscription] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);
  const router = useRouter();


  // Redirección basada en el token (cliente)
  useEffect(() => {
    console.log("Token actual:", cookies.token); // Debug
    if (cookies.token) {
      router.push("/me");
    }
  }, [cookies.token, router]);

  // Crear o buscar usuario y enviar código
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

  // Manejar código y tomar el token para pasarlo a las cookies
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
        setErrorCode(true); // Corregí `serErrorCode`
        throw new Error("Código inválido");
      }

      const { token } = await response.json();
      setCookie("token", token, { path: "/" }); // Aseguro que la cookie sea accesible en todas las rutas
      setShowSubscription(true);
      setErrorCode(false); // Reinicio el error si el código es correcto
    } catch (err) {
      console.log("Error al verificar el código:", err);
    }
  };

  // Renderizado principal
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

        {showSubscription ? (
          <SubscriptionCard
            hrefAnual="/auth/register"
            hrefMensual="/auth/register"
            hrefFree="/auth/register"
          />
        ) : (
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
                  name="code" // Aseguro que el name coincida con e.target.code
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
  const token = req.cookies.token; // Leer la cookie directamente en el servidor

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