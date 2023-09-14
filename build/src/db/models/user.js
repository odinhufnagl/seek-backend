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
const core_1 = require("@sequelize/core");
const bcryptjs_1 = require("bcryptjs");
const sequelize_1 = require("sequelize");
const constants_1 = require("../../constants");
const answer_1 = __importDefault(require("./answer"));
const chat_1 = __importDefault(require("./chat"));
const file_1 = __importDefault(require("./file"));
const language_1 = __importDefault(require("./language"));
const location_1 = __importDefault(require("./location"));
const message_1 = __importDefault(require("./message"));
const notificationToken_1 = __importDefault(require("./notificationToken"));
const question_1 = __importDefault(require("./question"));
const readMessage_1 = __importDefault(require("./readMessage"));
const userBlocking_1 = __importDefault(require("./userBlocking"));
const userChat_1 = __importDefault(require("./userChat"));
const userQuestion_1 = __importDefault(require("./userQuestion"));
class User extends sequelize_1.Model {
    constructor() {
        super(...arguments);
        this.validatePassword = (password, encryptedPassword) => __awaiter(this, void 0, void 0, function* () {
            return yield (0, bcryptjs_1.compareSync)(password, encryptedPassword);
        });
        this.hashPassword = (newPassword) => __awaiter(this, void 0, void 0, function* () {
            return yield (0, bcryptjs_1.hashSync)(newPassword);
        });
    }
    static _init(sequelize) {
        User.init({
            id: {
                type: core_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            email: {
                type: core_1.DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isEmail: true,
                },
            },
            password: {
                type: core_1.DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    len: [5, 100],
                },
            },
            name: {
                type: core_1.DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            instagramName: {
                type: core_1.DataTypes.STRING,
            },
            snapchatName: {
                type: core_1.DataTypes.STRING,
            },
            bio: {
                type: core_1.DataTypes.STRING,
                allowNull: true,
            },
            isActive: {
                type: core_1.DataTypes.BOOLEAN,
                defaultValue: false,
            },
            lastActive: {
                type: core_1.DataTypes.DATE,
                defaultValue: sequelize_1.Sequelize.fn("now"),
            },
            timeZone: {
                type: core_1.DataTypes.STRING,
                allowNull: false,
                defaultValue: constants_1.FIRST_TIME_ZONE,
            },
            languageName: {
                type: core_1.DataTypes.STRING,
                defaultValue: "en",
            },
            resetPasswordToken: {
                type: core_1.DataTypes.STRING,
            },
        }, {
            modelName: "user",
            timestamps: true,
            sequelize,
            defaultScope: {
                attributes: { exclude: ["password"] },
            },
        });
        User.beforeCreate((user) => __awaiter(this, void 0, void 0, function* () {
            if (user.password) {
                user.password = yield user.hashPassword(user.password);
            }
        }));
    }
    static associate() {
        User.belongsTo(file_1.default, {
            as: this.fields.PROFILE_IMAGE,
        });
        User.belongsToMany(chat_1.default, { through: userChat_1.default });
        User.belongsToMany(message_1.default, { through: readMessage_1.default });
        User.belongsToMany(question_1.default, { through: userQuestion_1.default });
        User.belongsToMany(question_1.default, { through: answer_1.default, as: this.fields.ANSWERS });
        User.belongsTo(location_1.default, { as: this.fields.CURRENT_LOCATION });
        User.belongsTo(location_1.default);
        User.hasMany(answer_1.default);
        User.hasMany(notificationToken_1.default, { onDelete: "CASCADE" });
        User.belongsTo(language_1.default);
        User.belongsToMany(User, {
            through: userBlocking_1.default,
            as: this.fields.IS_BLOCKED_BY,
            foreignKey: constants_1.DBConstants.fields.userBlocking.BLOCKED_ID,
        });
        User.belongsToMany(User, {
            through: userBlocking_1.default,
            as: this.fields.HAS_BLOCKED,
            foreignKey: constants_1.DBConstants.fields.userBlocking.BLOCKER_ID,
        });
    }
}
User.fields = constants_1.DBConstants.fields.user;
exports.default = User;
