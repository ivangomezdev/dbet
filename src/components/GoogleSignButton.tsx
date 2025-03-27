"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function GoogleSignInButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { 
        callbackUrl: "/dashboard" 
      });
    } catch (error) {
      console.error("Error en inicio de sesión de Google:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className="signup__social-button signup__social-button--google"
    >
      <span className="signup__social-icon">G</span>
      {isLoading ? "Cargando..." : "Iniciar sesión con Google"}
    </button>
  );
}