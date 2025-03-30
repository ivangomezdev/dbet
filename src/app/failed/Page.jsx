import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Failed() {
  const router = useRouter();
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      setSessionId(router.query.session_id || "No disponible");
    }
  }, [router.isReady, router.query]);

  return (
    <div>
      <h1>Pago Rechazado o Cancelado</h1>
      <p>El pago no se pudo procesar o fue cancelado. ID de sesión: {sessionId || "Cargando..."}</p>
      <button onClick={() => router.push("/choose-subscription")}>
        Volver a elegir plan
      </button>
    </div>
  );
}