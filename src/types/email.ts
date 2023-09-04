import { ServerLanguage } from "../types";

export interface ForgotPasswordEmailParams {
  token: string;
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
  token: string;
  language: ServerLanguage;
  recipient: string;
};

export type DefaultEmailProps = DefaultEmailForgotPasswordProps;
