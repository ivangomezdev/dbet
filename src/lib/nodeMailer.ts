import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email:string, code:number) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // TLS en puerto 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verifica la conexión primero (opcional, para depuración)
    await transporter.verify();
    console.log("Conexión SMTP verificada");

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Tu código de verificación",
      text: `Tu código de verificación es: ${code}`,
    });

    console.log("Email enviado:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error enviando email:", error);
    throw error; // Lanza el error para que la API lo maneje
  }
};