// src/app/api/pruebas/route.js
import { sendVerificationEmail } from "@/lib/nodeMailer"; // Ajusta la ruta según tu estructura
import { NextResponse } from "next/server"; // Para devolver respuestas

export async function POST(request) {
  try {
    // Lee el cuerpo de la solicitud
    const { email, code } = await request.json();

    // Valida los datos
    if (!email || !code) {
      return NextResponse.json(
        { message: "Faltan email o code" },
        { status: 400 }
      );
    }

    // Envía el correo
    await sendVerificationEmail(email, code);

    return NextResponse.json(
      { message: "Correo enviado con éxito" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en la API:", error);
    return NextResponse.json(
      { message: "Error al enviar correo", error: error.message },
      { status: 500 }
    );
  }
}