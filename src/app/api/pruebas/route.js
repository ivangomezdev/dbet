import { sendVerificationEmail } from "@/lib/nodeMailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Método no permitido" });
    }
  
    const { email, code } = req.body;
  
    try {
      await sendVerificationEmail(email, code);
      return res.status(200).json({ message: "Correo enviado con éxito" });
    } catch (error) {
      console.error("Error en la API:", error);
      return res.status(500).json({ message: "Error al enviar correo", error: error.message });
    }
  }