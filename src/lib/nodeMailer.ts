
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);




export const sendVerificationEmail = async (email: string, code: number) => {
  try {
    await resend.emails.send({
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