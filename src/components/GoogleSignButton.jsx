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
    <div onClick={handleGoogleSignIn}>
      <button
        
        disabled={isLoading}
        className="auth-button google"
      >
    <img style={{width:"20px",height:"20px"}} src="https://res.cloudinary.com/dllkefj8m/image/upload/v1746116939/google-logo-icon-gsuite-hd-701751694791470gzbayltphh-removebg-preview_omdfxw.png" alt="" />
        {isLoading ? "Cargando..." : ""}
      </button>
     
    </div>
  );
}