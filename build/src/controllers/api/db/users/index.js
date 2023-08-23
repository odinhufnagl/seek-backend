"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../../../classes");
const controllers_1 = __importDefault(require("../../../../constants/controllers"));
const models_1 = require("../../../../db/models");
const db_1 = require("../../../../services/db/db");
const users_1 = require("../../../../services/db/users");
const userController = new classes_1.BaseController(models_1.User, "user");
const getUsers = userController.getPlural(controllers_1.default.defaultDBOptions.user.get);
const getUserByPK = userController.get(controllers_1.default.defaultDBOptions.user.get);
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.id);
    const body = req.body;
    let toUpdate = req.body;
    delete toUpdate["password"];
    const r = yield models_1.sequelize.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
        if (body.location) {
            const createdLocation = yield (0, db_1.dbCreate)(models_1.Location, body.location, {
                include: [{ model: models_1.Coordinate }],
                transaction: t,
            });
            toUpdate.locationId = createdLocation.id;
        }
        if (body.profileImage) {
            const profileImage = yield (0, db_1.dbCreate)(models_1.File, body.profileImage, {
                transaction: t,
            });
            toUpdate.profileImageId = profileImage.id;
        }
        yield (0, users_1.updateUser)(userId, toUpdate, {
            transaction: t,
            where: {},
            returning: true,
        });
        const updatedUser = yield (0, users_1.findUserByPK)(userId, { transaction: t });
        return updatedUser;
    }));
    console.log("r", r);
    res.send(r);
});
exports.default = { getUsers, getUserByPK, putUser };
