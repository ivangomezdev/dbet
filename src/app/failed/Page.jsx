import { useRouter } from "next/router";

export default function Failed() {
  const router = useRouter();
  const { session_id } = router.query;

  return (
    <div>
      <h1>Pago Rechazado o Cancelado</h1>
      <p>El pago no se pudo procesar o fue cancelado. ID de sesión: {session_id}</p>
      <button onClick={() => router.push("/choose-subscription")}>
        Volver a elegir plan
      </button>
    </div>
  );
}