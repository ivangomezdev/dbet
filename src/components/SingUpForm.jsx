// app/signup/page.js
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import "./singUpForm.css";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSocialLogin = async (provider) => {
    try {
      const result = await signIn(provider, { callbackUrl: "/dashboard" });
      if (result?.error) {
        setError(`Error al iniciar con ${provider}`);
      }
    } catch (err) {
      setError(`Error al conectar con ${provider}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const registerResponse = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!registerResponse.ok) {
        const errorData = await registerResponse.json();
        setError(errorData.message || "Error al registrar usuario");
        return;
      }

      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.error) {
        setError("Error al iniciar sesión después del registro");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Error en el servidor");
    }
  };

  return (
    <div className="signup">
      <div className="signup__container">
        <h1 className="signup__title">¡Bienvenido!</h1>

        {error && <p className="signup__error">{error}</p>}

        <p className="signup__social-text">Regístrate con una de tus redes sociales</p>

        <div className="signup__social-buttons">
          <button
            onClick={() => handleSocialLogin("facebook")}
            className="signup__social-button signup__social-button--facebook"
          >
            <span className="signup__social-icon">f</span>
          </button>
          <button
            onClick={() => handleSocialLogin("twitter")}
            className="signup__social-button signup__social-button--twitter"
          >
            <span className="signup__social-icon">X</span>
          </button>
          <button
            onClick={() => handleSocialLogin("google")}
            className="signup__social-button signup__social-button--google"
          >
            <span className="signup__social-icon">G</span>
          </button>
        </div>

        <p className="signup__divider">O utiliza tu email</p>

        <form className="signup__form" onSubmit={handleSubmit}>
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
            />
          </div>

          <div className="signup__form-group">
            <label htmlFor="password" className="signup__label">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="signup__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="signup__submit-button">
            Regístrate
          </button>
        </form>

        <div className="signup__footer">
          <a href="#" className="signup__link">
            Terms & Conditions
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