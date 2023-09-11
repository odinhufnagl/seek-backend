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
const connecting_1 = require("./src/cronJobs/connecting");
const index_1 = require("./src/db/models/index");
const middleware_1 = require("./src/middleware");
const index_2 = __importDefault(require("./src/routes/api/index"));
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
    /* const languages = await dbBulkCreate(Language, [
      { name: "en" },
      { name: "se" },
    ]);
    const fileTypes = await dbBulkCreate(FileType, [
      { name: "image" },
      { name: "video" },
    ] as FileType[]);*/
    /*try {
      fs.readFile(
        path.join(__dirname, "src/data/iso-alpha-2.json"),
        "utf8",
        async (err, data) => {
          if (err) {
            console.error("Error reading the file:", err);
            return;
          }
  
          try {
            const countryCodes = JSON.parse(data) as Record<string, string>;
  
            // Now you have the array of objects from the JSON file
            const countries = await dbBulkCreate(
              Country,
              Object.keys(countryCodes).map((code) => ({
                code,
                name: countryCodes[code],
              }))
            );
            const countryArea = await dbBulkCreate(
              CountryArea,
              countries.map((c) => ({ countryCode: c.code }))
            );
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        }
      );
      const fileTypes = await dbBulkCreate(FileType, [
        { name: "image" },
        { name: "video" },
      ] as FileType[]);
  
      const languages = await dbBulkCreate(Language, [
        { name: "en" },
        { name: "se" },
      ]);
  
      const questionContent = await dbBulkCreate(
        QuestionContent,
        [
          {
            title:
              "When was the last time you impulsively picked up a new hobby?",
            coverImage: {
              url: "https://firebasestorage.googleapis.com/v0/b/seek-3abe9.appspot.com/o/questionImages%2Fman-fishing.jpg?alt=media&token=0bda457c-3bdc-45b1-a416-9d0231c28585",
              name: "man-fishing",
            } as File,
          },
          {
            title:
              "If you could go back and undo one thing in your life, what would it be?",
            coverImage: {
              url: "https://firebasestorage.googleapis.com/v0/b/seek-3abe9.appspot.com/o/questionImages%2Ffriends-on-beach.jpg?alt=media&token=f672e3d1-88fc-4e53-b6eb-6dfa76bdd8f9",
              name: "friends-on-beach",
            } as File,
          },
          {
            title:
              "If you could give your younger self one piece of advice, what would it be?",
            coverImage: {
              url: "https://firebasestorage.googleapis.com/v0/b/seek-3abe9.appspot.com/o/questionImages%2Ftwo-men-greeting.jpg?alt=media&token=f958a6d5-b265-476b-98e8-43df5450b1ab",
              name: "two-men-greeting",
            } as File,
          },
          {
            title:
              "If you could travel anywhere in the world right now, where would you go and why?",
            coverImage: {
              url: "https://firebasestorage.googleapis.com/v0/b/seek-3abe9.appspot.com/o/questionImages%2Fman-photographing-airbaloons.jpg?alt=media&token=a0d4530e-993d-4dc0-aa4c-bec1d5f7543a",
              name: "man-photographing",
            } as File,
          },
          {
            title: "What’s a challenge you’ve overcome?",
            coverImage: {
              url: "https://firebasestorage.googleapis.com/v0/b/seek-3abe9.appspot.com/o/questionImages%2Fwoman-holding-stick.jpg?alt=media&token=9ac44104-fce4-4bd8-945c-f1336131934c",
              name: "woman-holding-stick",
            } as File,
          },
        ],
        {
          include: [
            { model: File, as: DBConstants.fields.questionContent.COVER_IMAGE },
          ],
        }
      );
    } catch (e) {
      console.log("e", e);
      console.log("data is probably already created");
    }*/
    const startCron = process.argv.includes("--cron");
    console.log(__dirname);
    if (startCron) {
        (0, connecting_1.initCronJobs)();
    }
    else {
        initApp();
    }
}));
