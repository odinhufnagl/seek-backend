import { Sequelize } from "sequelize";
import { DBConstants } from "../constants";
import { File, QuestionContent } from "../db/models";
import { dbFindAll, dbUpdate } from "./db/db";

export const generateQuestionContent = async (): Promise<QuestionContent> => {
  const randomQuestionContent = (
    await dbFindAll(QuestionContent, {
      order: Sequelize.literal("random()"),
      limit: 1,
      include: [
        { model: File, as: DBConstants.fields.questionContent.COVER_IMAGE },
      ],
      where: { used: false },
    })
  )[0];
  await dbUpdate(
    QuestionContent,
    { used: true },
    { where: { id: randomQuestionContent.id } }
  );
  return randomQuestionContent;
};
