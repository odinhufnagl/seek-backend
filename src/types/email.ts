type Template = "resetPassword";

export type EmailData = {
  params: ejs.Data;
  template: Template;
  recipient: string;
  subject: string;
  sender: string;
};
