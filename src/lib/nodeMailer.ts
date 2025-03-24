// nodemailer.js
import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email: string, code: number) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Añade estas opciones para depuración y compatibilidad
      logger: true,
      debug: true,
      pool: true, // Usa conexión pooling para serverless
      maxConnections: 1, // Limita conexiones simultáneas
    });

    // Verificación opcional (coméntala si no necesitas logs extra)
    await transporter.verify();
    console.log("Conexión SMTP verificada");

    const info = await transporter.sendMail({
      from: `"Tu App" <${process.env.EMAIL_USER}>`, // Formato amigable
      to: email,
      subject: "Tu código de verificación",
      text: `Tu código de verificación es: ${code}`,
      html: `<p>Tu código de verificación es: <strong>${code}</strong></p>`, // Añade HTML
    });

    console.log("Email enviado:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error enviando email:", error);
    throw error;
  }
};