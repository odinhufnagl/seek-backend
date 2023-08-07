import { Response } from "express";
import { BaseController } from "../../../../classes";
import ControllersConstants from "../../../../constants/controllers";
import {
  Coordinate,
  File,
  Location,
  sequelize,
  User,
} from "../../../../db/models";
import { dbCreate } from "../../../../services/db/db";
import { findUserByPK, updateUser } from "../../../../services/db/users";
import { RequestPutUser } from "../../../../types";

const userController = new BaseController(User, "user");
const getUsers = userController.getPlural(
  ControllersConstants.defaultDBOptions.user.get
);
const getUserByPK = userController.get(
  ControllersConstants.defaultDBOptions.user.get
);

const putUser = async (req: RequestPutUser, res: Response): Promise<void> => {
  const userId = Number(req.params.id);
  const body = req.body;
  let toUpdate = req.body as User;
  delete toUpdate["password"];
  const r = await sequelize.transaction(async (t) => {
    if (body.location) {
      const createdLocation = await dbCreate(Location, body.location, {
        include: [{ model: Coordinate }],
        transaction: t,
      });
      toUpdate.locationId = createdLocation.id;
    }

    if (body.profileImage) {
      const profileImage = await dbCreate(File, body.profileImage, {
        transaction: t,
      });
      toUpdate.profileImageId = profileImage.id;
    }

    await updateUser(userId, toUpdate, {
      transaction: t,
      where: {},
      returning: true,
    });

    const updatedUser = await findUserByPK(userId, { transaction: t });

    return updatedUser;
  });
  console.log("r", r);
  res.send(r);
};

export default { getUsers, getUserByPK, putUser };
