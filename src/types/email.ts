import { ServerLanguage } from "../types";

export interface ForgotPasswordEmailParams {
  link: string;
}
export type EmailTemplate = "resetPassword";

export type EmailParams = ForgotPasswordEmailParams;

export type EmailType = "resetPassword";

export type EmailData = {
  params: ejs.Data;
  template: EmailTemplate;
  recipient: string;
  subject: string;
  sender: string;
};

export type DefaultEmailForgotPasswordProps = {
  link: string;
  language: ServerLanguage;
  recipient: string;
};

export type DefaultEmailProps = DefaultEmailForgotPasswordProps;
