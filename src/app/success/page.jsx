"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Success() {
  const router = useRouter();
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      setSessionId(router.query.session_id || "No disponible");
    }
  }, [router.isReady, router.query]);

  return (
    <div>
      <h1>¡Pago Exitoso!</h1>
      <p>Tu suscripción ha sido activada con éxito. ID de sesión: {sessionId || "Cargando..."}</p>
      <button onClick={() => router.push("/me")}>Ir a mi perfil</button>
    </div>
  );
}