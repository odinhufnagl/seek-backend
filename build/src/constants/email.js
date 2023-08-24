"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailConstants = exports.emailTemplate = exports.emailSender = exports.emailSubject = exports.emailText = void 0;
const translations_1 = require("./translations");
const auth = {
    user: "odin.hufnagl@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
};
const transport = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth,
};
const emailText = (type, language, params) => (0, translations_1.translations)(params)[language].email[type].text;
exports.emailText = emailText;
const emailSubject = (type, language, params) => {
    console.log(type, language, params);
    return (0, translations_1.translations)(params)[language].email[type].subject;
};
exports.emailSubject = emailSubject;
const emailSender = (type, language) => "odin.hufnagl@gmail.com";
exports.emailSender = emailSender;
const emailTemplate = (type, language) => (0, translations_1.translations)()[language].email[type].template;
exports.emailTemplate = emailTemplate;
const defaultEmail = {
    resetPassword: ({ link, recipient, language, }) => ({
        recipient,
        sender: (0, exports.emailSender)("resetPassword", language),
        subject: (0, exports.emailSubject)("resetPassword", language),
        template: (0, exports.emailTemplate)("resetPassword", language),
        params: {
            text: (0, exports.emailText)("resetPassword", language),
            link,
        },
    }),
};
class EmailConstants {
}
exports.EmailConstants = EmailConstants;
EmailConstants.auth = auth;
EmailConstants.transport = transport;
EmailConstants.defaultEmailText = exports.emailText;
EmailConstants.defaultEmailSubjext = exports.emailSubject;
EmailConstants.defaultEmail = defaultEmail;
