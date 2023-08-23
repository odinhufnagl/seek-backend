"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const ejs_1 = __importDefault(require("ejs"));
const fs_1 = __importDefault(require("fs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const EMAIL_CLIENT_AUTH = {
    user: "odin.hufnagl@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
};
const TRANSPORT = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: EMAIL_CLIENT_AUTH,
};
const emailTemplatePath = (template) => __dirname + `assets/emailTemplates/${template}.ejs`;
const getEmailTemplate = (template) => {
    return fs_1.default.readFileSync(emailTemplatePath(template), "utf-8");
};
const sendEmail = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { params, template, recipient, subject, sender } = data;
    const transporter = nodemailer_1.default.createTransport(TRANSPORT);
    const emailTemplateJSEmbedded = ejs_1.default.render(getEmailTemplate(template), params);
    const mailOptions = {
        from: sender,
        to: recipient,
        subject: subject,
        html: emailTemplateJSEmbedded,
    };
    const res = yield transporter.sendMail(mailOptions);
    return Boolean(res);
});
exports.sendEmail = sendEmail;
