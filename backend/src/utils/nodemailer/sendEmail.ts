import { createTransport } from 'nodemailer';
import nodemailerConfig from './config';

const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  const transporter = createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: '"Node.js Server 👻" <petrovicicatalin24@yahoo.com>', // sender address
    to,
    subject,
    html,
    // to: 'petrovicicatalin24@yahoo.com', // list of receivers
    // subject: 'Hello ✔', // Subject line
    // text: 'Salutare! Acest mesaj a fost trimis de Node.js.',
    // html: '<b>Salutare! Acest mesaj a fost trimis de Node.js.</b>', // html body
  });
};

export default sendEmail;
