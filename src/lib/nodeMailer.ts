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



    await new Promise((resolve, reject) => {
      // verify connection configuration
      transporter.verify(function (error, success) {
          if (error) {
              console.log(error);
              reject(error);
          } else {
              console.log("Server is ready to take our messages");
              resolve(success);
          }
      });
  });

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