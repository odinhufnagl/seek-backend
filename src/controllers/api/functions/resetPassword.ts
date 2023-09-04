import { Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  ApiBadBodyProvidedError,
  ApiDatabaseError,
  ApiDatabaseNotFoundError,
  ApiEmailError,
} from "../../../classes";
import { EmailConstants } from "../../../constants";
import { User } from "../../../db/models";
import {
  dbFindOne,
  dbUpdate,
  sendEmail,
  serverLanguageFromDBLanguage,
} from "../../../services";
import { RequestResetPassword } from "../../../types";
const resetPasswordController = async (
  req: RequestResetPassword,
  res: Response
) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiBadBodyProvidedError();
  }
  const user = await dbFindOne(User, { where: { email } });
  if (!user) {
    throw new ApiDatabaseNotFoundError();
  }

  const token = uuidv4().substring(0, 20);

  const emailIsSent = await sendEmail(
    EmailConstants.defaultEmail.resetPassword({
      token,
      recipient: email,
      language: serverLanguageFromDBLanguage(user.language),
    })
  );
  if (!emailIsSent) {
    throw new ApiEmailError();
  }
  const updatedUser = await dbUpdate(
    User,
    { resetPasswordToken: token },
    { where: { id: user.id } }
  );
  if (updatedUser[0] === 0) {
    throw new ApiDatabaseError();
  }
  res.send(true);
};

export default { resetPasswordController };
