import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email: string, code: number) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Tu código de verificación",
    text: `Tu código de verificación es: ${code}`,
  });
};
