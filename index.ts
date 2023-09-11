require("dotenv").config();
import bodyParser from "body-parser";
import express from "express";
import * as admin from "firebase-admin";
import { createServer } from "http";
import { initCronJobs } from "./src/cronJobs/connecting";
import { sequelize } from "./src/db/models/index";
import { errorHandler } from "./src/middleware";
import apiRoutes from "./src/routes/api/index";
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
    initCronJobs();
  } else {
    initApp();
  }
});
