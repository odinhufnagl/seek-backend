import { Response } from "express";
import moment from "moment-timezone";
import { Op, literal } from "sequelize";
import { ApiDatabaseNotFoundError } from "../../../../../classes";
import { DBConstants, DateConstants } from "../../../../../constants";
import { File, Question, User } from "../../../../../db/models";
import { dbFindAll, dbFindByPK } from "../../../../../services";
import { Request } from "../../../../../types";

const getNewQuestion = async (req: Request, res: Response): Promise<void> => {
  const userId = Number(req.params.id);
  const user = await dbFindByPK(User, userId);
  if (!user) {
    throw new ApiDatabaseNotFoundError();
  }
  const questions = await dbFindAll(Question, {
    replacements: { userId },
    //TODO: this where seems slow. The literal should be improved, or implemented without pure SQL.
    where: {
      id: {
        [Op.notIn]: literal(
          `(SELECT "questionId" FROM "answers" WHERE "answers"."userId" = :userId)`
        ),
      },
      isFinished: false,
    },
    include: [{ model: File, as: DBConstants.fields.question.COVER_IMAGE }],

    order: [["createdAt", "DESC"]],
  });
  console.log("questions", questions);
  //Check which one that time has passed, starting with latest

  for (const question of questions) {
    const usersTime = moment(
      moment()
        .tz(user.timeZone)
        .format(DateConstants.formats.DATE_WITHOUT_TIMEZONE),
      DateConstants.formats.DATE_WITHOUT_TIMEZONE
    );
    console.log("usersTime", usersTime);
    const questionTime = moment(
      question.timeToStart,
      DateConstants.formats.DATE_WITHOUT_TIMEZONE
    );
    console.log("questionTime", questionTime);
    if (questionTime.isBefore(usersTime)) {
      res.send(question);
      return;
    }
  }
  res.send(null);
};

export default { getNewQuestion };
