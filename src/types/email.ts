type Template = "resetPassword";

type EmailData = {
  params: ejs.Data;
  template: Template;
  recipient: string;
  subject: string;
  sender: string;
};

export { EmailData };
