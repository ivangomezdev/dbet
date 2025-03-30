"use client"
import { useRouter } from "next/router";

export default function Success() {
  const router = useRouter();
  const { session_id } = router.query;

  return (
    <div>
      <h1>¡Pago Exitoso!</h1>
      <p>Tu suscripción ha sido activada con éxito. ID de sesión: {session_id}</p>
      <button onClick={() => router.push("/me")}>Ir a mi perfil</button>
    </div>
  );
}