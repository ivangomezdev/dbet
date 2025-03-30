"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import "./failed.css"

export default function Failed() {
  const router = useRouter()
  const [sessionId, setSessionId] = useState(null)

  useEffect(() => {
    // Note: In App Router, we don't need to check isReady
    // and query params are accessed differently
    const searchParams = new URLSearchParams(window.location.search)
    const session = searchParams.get("session_id") || "No disponible"
    setSessionId(session)
  }, [])

  return (
    <div className="contentEl">
      <div className="bg-elements">
        <div className="circle-decoration circle-1"></div>
        <div className="circle-decoration circle-2"></div>
        <div className="circle-decoration circle-3"></div>
        <div className="card-icon"></div>
        <div className="arrow-icon"></div>
        <div className="small-circle-1"></div>
        <div className="small-circle-2"></div>
      </div>

      <div className="container">
        <div className="error-message">
          <div className="error-icon">
            <div className="circle"></div>
            <div className="cross-left"></div>
            <div className="cross-right"></div>
          </div>
          <h1>Pago erroneo!</h1>
          <p>Tu transacción tuvo un error, contacta con la entidad emisora de tu tarjeta o cambia el medio de pago.</p>

          <button className="goTo__button" onClick={() => router.push("/register")}>
            Volver
          </button>
        </div>
      </div>
    </div>
  )
}

