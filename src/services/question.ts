import { File, FileType } from "../db/models";

type QuestionContent = {
  title: string;
  coverImage: File;
};

export const generateQuestionContent = (): QuestionContent => ({
  title: "Where would you like to travel next?",
  coverImage: {
    url: "https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2231&q=80",
    name: "An image",
    type: { name: "image" } as FileType,
  } as File,
});
