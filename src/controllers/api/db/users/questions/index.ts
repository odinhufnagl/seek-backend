import { Response } from "express";
import { Op, literal } from "sequelize";
import { Question } from "../../../../../db/models";
import { dbFindAll } from "../../../../../services";
import { Request } from "../../../../../types";

const getNewQuestion = async (req: Request, res: Response): Promise<void> => {
  const userId = Number(req.params.id);
  const questions = await dbFindAll(Question, {
    limit: 1,
    replacements: { userId },
    //TODO: this where seems slow. The literal should be improved, or implemented without pure SQL.
    where: {
      id: {
        [Op.notIn]: literal(
          `(SELECT "questionId" FROM "answers" WHERE "answers"."userId" = :userId)`
        ),
      },
    },

    order: [["createdAt", "DESC"]],
  });
  console.log("q", questions);
  if (questions && questions.length > 0) {
    res.send(questions[0]);
  } else {
    res.send(null);
  }
};

export default { getNewQuestion };
