import { NextResponse } from "next/server";
import emailjs from "@emailjs/nodejs";

// Inicializa EmailJS con las credenciales manuales
emailjs.init({
  publicKey: "wCdowsq3Gd-v3MDME", // Reemplaza con tu EMAILJS_PUBLIC_KEY
  privateKey: "fAL8TCfQqdhosYubBcUtm", // Reemplaza con tu EMAILJS_PRIVATE_KEY
});

export async function POST(request) {
  // Debug: Mostrar las credenciales (sin privateKey completo por seguridad)
  console.log("EmailJS credentials:", {
    service: "service_00zfxyb", // Reemplaza con tu EMAILJS_SERVICE_ID
    template: "template_2m731gj", // Reemplaza con tu EMAILJS_TEMPLATE_ID
    publicKey: "wCdowsq3Gd-v3MDME", // Reemplaza con tu EMAILJS_PUBLIC_KEY
    privateKey: "fAL8TCfQqdhosYubBcUtm" ? "Loaded" : "Missing",
  });

  try {
    const { name, username, email, message } = await request.json();
    // Debug: Mostrar los datos del formulario
    console.log("Form data:", { name, username, email, message });

    // Validar que todos los campos estén presentes
    if (!name || !username || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const templateParams = {
      from_name: name,
      username: username,
      from_email: email,
      message: message,
    };

    // Enviar el email con EmailJS
    const response = await emailjs.send(
      "service_00zfxyb", // Reemplaza con tu EMAILJS_SERVICE_ID
      "template_2m731gj", // Reemplaza con tu EMAILJS_TEMPLATE_ID
      templateParams
    );

    console.log("EmailJS response:", response); // Debug: Mostrar la respuesta de EmailJS

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}