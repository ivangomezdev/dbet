"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GoogleSignInButton() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    

    try {
      const result = await signIn("google", {
        redirect: false, // Evita redirección automática
        callbackUrl: "/me"
      });


      if (result) {
       
        console.error("Error devuelto por NextAuth:", result);
        return;
      }

      if (result?.ok) {
        console.log("Inicio de sesión exitoso, redirigiendo...");
        router.push("/me");
      }
    } catch {
      console.error("Excepción en handleGoogleSignIn:");

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="signup__social-button signup__social-button--google"
      >
        <span className="signup__social-icon">G</span>
        {isLoading ? "Cargando..." : ""}
      </button>
     
    </div>
  );
}