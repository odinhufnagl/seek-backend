export const translations = (params?: any) => ({
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
        title: `${params?.userName}`,
      },
      isTyping: {
        title: `${params?.userName} is typing`,
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
        title: `${params?.userName}`,
      },
      isTyping: {
        title: `${params?.userName} is typing`,
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
