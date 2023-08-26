import { Response } from "express";
import { ApiQueryParamsError } from "../../../classes";
import UserBlocking from "../../../db/models/userBlocking";
import { dbFindOne } from "../../../services";
import { RequestIsUserBlocked } from "../../../types";

const isUserBlockedController = async (
  req: RequestIsUserBlocked,
  res: Response
) => {
  const { blockerId, userId } = req.query;
  if (!blockerId || !userId) {
    throw new ApiQueryParamsError();
  }
  const r = await dbFindOne(UserBlocking, {
    where: { blockerId, blockedId: userId },
  });
  if (r) {
    res.send(true);
    return;
  }
  res.send(false);
};

export default { isUserBlockedController };
