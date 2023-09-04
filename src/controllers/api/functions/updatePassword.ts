import { Response } from "express";
import { ApiDatabaseError, ApiDatabaseNotFoundError } from "../../../classes";
import { User } from "../../../db/models";
import { dbFindOne, dbUpdate } from "../../../services";
import { RequestUpdatePassword } from "../../../types";
const updatePasswordController = async (
  req: RequestUpdatePassword,
  res: Response
) => {
  const { newPassword, resetPasswordToken } = req.body;

  const user = await dbFindOne(User, { where: { resetPasswordToken } });
  if (!user) {
    throw new ApiDatabaseNotFoundError();
  }

  const updatedUser = await dbUpdate(
    User,
    { password: await user.hashPassword(newPassword), resetPasswordToken: "" },
    { where: { id: user.id } }
  );

  if (!updatedUser) {
    throw new ApiDatabaseError();
  }
  res.send(true);
};

export default { updatePasswordController };
