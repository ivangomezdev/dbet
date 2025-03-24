import { Resend } from 'resend';

const resend = new Resend('re_52G6bK3U_5Nqf16iwycdABxV8wF5cBTAw');


resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'ivansangomez6@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});