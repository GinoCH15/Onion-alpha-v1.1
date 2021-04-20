import { sendinBlue } from '../config/key';
import * as nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
  service: "SendinBlue",
  auth: {
    user: sendinBlue.user,
    pass: sendinBlue.password,
  },
});

export async function plainMailService(from: string, to: string, subject: string, text:string):Promise<any> 
{
  try {
    const mailOptions = {
      from: from,
      to: to,
      subject: subject,
      text: text
    };

    await transporter.sendMail(mailOptions)

    return `El correo fue enviado ${to}`;

  } catch (error) {
    console.log(error)
    throw "Error en el servicio de mensajeria, intentelo mas tarde.";
  }

}
export async function htmlMailService(from: string, to: string, subject: string, html:string):Promise<any> 
{
  try {
    const mailOptions = {
      from: from,
      to: to,
      subject: subject,
      html: html
    };

    await transporter.sendMail(mailOptions)

    return `El correo fue enviado ${to}`;

  } catch (error) {
    console.log(error)
    throw "Error en el servicio de mensajeria, intentelo mas tarde.";
  }

}
