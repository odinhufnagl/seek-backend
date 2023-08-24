import {
  DefaultEmailForgotPasswordProps,
  EmailTemplate,
  EmailType,
} from "../types";
import { ServerLanguage } from "../types/serverLanguages";
import { translations } from "./translations";

const auth = {
  user: "odin.hufnagl@gmail.com",
  pass: process.env.EMAIL_PASSWORD,
} as const;

const transport = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth,
} as const;

export const emailText = (
  type: EmailType,
  language: ServerLanguage,
  params?: any
) => translations(params)[language].email[type].text;

export const emailSubject = (
  type: EmailType,
  language: ServerLanguage,
  params?: any
) => {
  console.log(type, language, params);
  return translations(params)[language].email[type].subject;
};

export const emailSender = (type: EmailType, language: ServerLanguage) =>
  "odin.hufnagl@gmail.com";

export const emailTemplate = (
  type: EmailType,
  language: ServerLanguage
): EmailTemplate =>
  translations()[language].email[type].template as EmailTemplate;

const defaultEmail = {
  resetPassword: ({
    link,
    recipient,
    language,
  }: DefaultEmailForgotPasswordProps) => ({
    recipient,
    sender: emailSender("resetPassword", language),
    subject: emailSubject("resetPassword", language),
    template: emailTemplate("resetPassword", language),
    params: {
      text: emailText("resetPassword", language),
      link,
    },
  }),
};

export class EmailConstants {
  public static auth = auth;
  public static transport = transport;
  public static defaultEmailText = emailText;
  public static defaultEmailSubjext = emailSubject;
  public static defaultEmail = defaultEmail;
}
