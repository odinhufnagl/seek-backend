require("dotenv").config();
import bodyParser from "body-parser";
import express from "express";
import * as admin from "firebase-admin";
import fs from "fs";
import { createServer } from "http";
import path from "path";
import { DBConstants } from "./src/constants";
import { initCronJobs } from "./src/cronJobs/connecting";
import {
  Country,
  CountryArea,
  File,
  FileType,
  Language,
  QuestionContent,
  sequelize,
} from "./src/db/models/index";
import { errorHandler } from "./src/middleware";
import apiRoutes from "./src/routes/api/index";
import { dbBulkCreate } from "./src/services";
import { SocketServer } from "./src/socket";

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: `gs://${process.env.FIREBASE_STORAGE_BUCKET}/`,
});

const bucket = admin.storage().bucket();

export { bucket, socket };

var app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.use(errorHandler);
let server = createServer();
server.on("request", app);

const socket = new SocketServer(server);

const initApp = (): void => {
  /*const httpServer = app.listen(process.env.PORT, () =>
    console.log(`listening on port ${process.env.PORT}`)
  );*/

  server.listen(process.env.PORT, () =>
    console.log(`listening on port ${process.env.PORT}`)
  );
};

sequelize.sync({ force: false }).then(async () => {
  /* const languages = await dbBulkCreate(Language, [
    { name: "en" },
    { name: "se" },
  ]);
  const fileTypes = await dbBulkCreate(FileType, [
    { name: "image" },
    { name: "video" },
  ] as FileType[]);*/

  try {
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
            "What's the most interesting thing that happened to you this week?",
          coverImage: {
            url: "https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
            name: "movie",
          } as File,
        },
        {
          title:
            "If you could travel anywhere in the world right now, where would you go and why?",
          coverImage: {
            url: "https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
            name: "wish",
          } as File,
        },
        {
          title:
            "What's a skill or hobby you've always wanted to learn but haven't had the chance to yet?",
          coverImage: {
            url: "https://images.unsplash.com/35/JOd4DPGLThifgf38Lpgj_IMG.jpg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNhZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            name: "wish",
          } as File,
        },
        {
          title:
            "If you could give your younger self one piece of advice, what would it be?",
          coverImage: {
            url: "https://images.unsplash.com/35/JOd4DPGLThifgf38Lpgj_IMG.jpg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNhZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            name: "wish",
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
  }

  const startCron = process.argv.includes("--cron");
  console.log(__dirname);
  if (startCron) {
    initCronJobs();
  } else {
    initApp();
  }
});
