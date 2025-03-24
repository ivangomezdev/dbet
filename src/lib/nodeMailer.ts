
import { Resend } from 'resend';

const resend = new Resend('re_52G6bK3U_5Nqf16iwycdABxV8wF5cBTAw');




export const sendVerificationEmail = async (email: string, code: number) => {
  try {
    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Tu código para iniciar sesión',
      html: `<p>Tu código es <strong>${code}</strong>!</p>`
    });

   
  } catch (error) {
    console.error("Error general al enviar email:", error);
    throw error;
  }
};