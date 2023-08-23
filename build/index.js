"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.socket = exports.bucket = void 0;
require("dotenv").config();
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const admin = __importStar(require("firebase-admin"));
const http_1 = require("http");
const constants_1 = require("./src/constants");
const connecting_1 = require("./src/cronJobs/connecting");
const index_1 = require("./src/db/models/index");
const middleware_1 = require("./src/middleware");
const index_2 = __importDefault(require("./src/routes/api/index"));
const services_1 = require("./src/services");
const socket_1 = require("./src/socket");
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: `gs://${process.env.FIREBASE_STORAGE_BUCKET}/`,
});
const bucket = admin.storage().bucket();
exports.bucket = bucket;
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use("/api", index_2.default);
app.use(middleware_1.errorHandler);
let server = (0, http_1.createServer)();
server.on("request", app);
const socket = new socket_1.SocketServer(server);
exports.socket = socket;
const initApp = () => {
    /*const httpServer = app.listen(process.env.PORT, () =>
      console.log(`listening on port ${process.env.PORT}`)
    );*/
    server.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`));
};
index_1.sequelize.sync({ force: false }).then(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileTypes = yield (0, services_1.dbBulkCreate)(index_1.FileType, [
            { name: "image" },
            { name: "video" },
        ]);
        const countries = yield (0, services_1.dbBulkCreate)(index_1.Country, [
            { code: "SE" },
            { code: "US" },
        ]);
        const countryArea = yield (0, services_1.dbBulkCreate)(index_1.CountryArea, [
            { countryId: 1 },
            { countryId: 2 },
        ]);
        const languages = yield (0, services_1.dbBulkCreate)(index_1.Language, [
            { name: "en" },
            { name: "se" },
        ]);
        const questionContent = yield (0, services_1.dbBulkCreate)(index_1.QuestionContent, [
            {
                title: "What is your favourite movie?",
                coverImage: {
                    url: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW92aWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
                    name: "movie",
                },
            },
            {
                title: "What is something you wish you said?",
                coverImage: {
                    url: "https://images.unsplash.com/35/JOd4DPGLThifgf38Lpgj_IMG.jpg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNhZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
                    name: "wish",
                },
            },
        ], {
            include: [
                { model: index_1.File, as: constants_1.DBConstants.fields.questionContent.COVER_IMAGE },
            ],
        });
    }
    catch (e) {
        console.log("e", e);
        console.log("data is probably already created");
    }
    const startCron = process.argv.includes("--cron");
    console.log(__dirname);
    if (startCron) {
        (0, connecting_1.initCronJobs)();
    }
    else {
        initApp();
    }
}));
