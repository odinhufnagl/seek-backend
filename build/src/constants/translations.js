"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translations = void 0;
const translations = (params) => ({
    se: {
        email: {
            resetPassword: {
                template: "resetPassword",
                subject: "Ändra lösenord",
                text: { header: "Ändra ditt lösenord" },
            },
        },
        notification: {
            chatMessage: {
                title: `${params === null || params === void 0 ? void 0 : params.userName}`,
            },
            isTyping: {
                title: `${params === null || params === void 0 ? void 0 : params.userName} is typing`,
            },
            dailyQuestion: {
                title: "Time for your daily question",
            },
            newChat: {
                title: "New Connection",
            },
        },
    },
    en: {
        email: {
            resetPassword: {
                template: "resetPassword",
                subject: "Change password",
                text: { header: "Change your password" },
            },
        },
        notification: {
            chatMessage: {
                title: `${params === null || params === void 0 ? void 0 : params.userName}`,
            },
            isTyping: {
                title: `${params === null || params === void 0 ? void 0 : params.userName} is typing`,
            },
            dailyQuestion: {
                title: "Time for your daily question",
            },
            newChat: {
                title: "New Connection",
            },
        },
    },
});
exports.translations = translations;
