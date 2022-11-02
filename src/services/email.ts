import nodemailer from "nodemailer";
import ejs from "ejs";
import fs from "fs";
import path from "path";
import { EmailData } from "../types";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { AuthenticationType } from "nodemailer/lib/smtp-connection";

const EMAIL_CLIENT_AUTH: AuthenticationType = {
  user: "odin.hufnagl@gmail.com",
  pass: process.env.EMAIL_PASSWORD,
};

const TRANSPORT: SMTPTransport.Options = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: EMAIL_CLIENT_AUTH,
};

const emailTemplatePath = (template: string): string =>
  path.resolve() + `/assets/emailTemplates/${template}.ejs`;

const getEmailTemplate = (template: string) => {
  return fs.readFileSync(emailTemplatePath(template), "utf-8");
};

export const sendEmail = async (data: EmailData): Promise<boolean> => {
  const { params, template, recipient, subject, sender } = data;

  const transporter = nodemailer.createTransport(TRANSPORT);

  const emailTemplateJSEmbedded = ejs.render(
    getEmailTemplate(template),
    params
  );

  const mailOptions = {
    from: sender,
    to: recipient,
    subject: subject,
    html: emailTemplateJSEmbedded,
  };

  const res = await transporter.sendMail(mailOptions);
  return Boolean(res);
};
