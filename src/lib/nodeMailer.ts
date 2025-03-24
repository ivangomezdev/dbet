import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email: string, code: number) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // TLS en puerto 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();
    console.log("Conexión SMTP verificada");

    const info = await new Promise((resolve, reject) => {
      transporter.sendMail(
        {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Tu código de verificación",
          text: `Tu código de verificación es: ${code}`,
        },
        (err, info) => {
          if (err) {
            console.error("Error enviando email:", err);
            reject(err);
          } else {
            console.log("Email enviado:", info.messageId);
            resolve(info);
          }
        }
      );
    });

    return info;
  } catch (error) {
    console.error("Error general al enviar email:", error);
    throw error;
  }
};