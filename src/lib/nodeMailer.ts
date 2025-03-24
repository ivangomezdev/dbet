
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


export const sendVerificationEmail = async (email: string, code: number) => {
  try {
    const response = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Tu código para iniciar sesión',
      html: `<p>Tu código es <strong>${code}</strong>!</p>`,
    });
    console.log('Email enviado:', response);
    return response;
  } catch (error) {
    console.error('Error al enviar email:', error);
    throw error;
  }
};