type QuestionContent = {
  title: string;
  coverImage: { location: string; name: string };
};

export const generateQuestionContent = (): QuestionContent => ({
  title: "hello",
  coverImage: { location: "def.png", name: "An image" },
});
