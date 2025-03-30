"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./success.css"

export default function Success() {
  const router = useRouter();
  const [sessionId, setSessionId] = useState(null);

 const [showElements, setShowElements] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowElements(true)
      console.log(showElements);
      
    }, 300)

    return () => clearTimeout(timer)
  }, [])


  useEffect(() => {
    if (router.isReady) {
      setSessionId(router.query.session_id || "No disponible");
    }
  }, [router.isReady, router.query]);

  return (
    <div className="contentEl">
     <div class="bg-elements">
    <div class="circle-decoration circle-1"></div>
    <div class="circle-decoration circle-2"></div>
    <div class="circle-decoration circle-3"></div>
    <div class="card-icon"></div>
    <div class="arrow-icon"></div>
    <div class="small-circle-1"></div>
    <div class="small-circle-2"></div>
  </div>
  
  <div class="container">
    <div class="success-message">
      <div class="success-icon">
        <div class="circle"></div>
        <div class="checkmark"></div>
      </div>
      <h1>Pago exitoso!</h1>
      <p>Tu transacción fue procesada correctamente <span style={{color:"green"}}>ID de pago: {sessionId || "Cargando..."}</span>.</p>
      
      <button className="goTo__button" onClick={() => router.push("/me")}>Volver</button>
    </div>
  </div>

    </div>
  );
}