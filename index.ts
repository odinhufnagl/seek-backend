require("dotenv").config();
import bodyParser from "body-parser";
import express from "express";
import * as admin from "firebase-admin";
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
import { SocketServer } from "./src/socket/index";

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

const initApp = (): void => {
  app.listen(process.env.PORT, () =>
    console.log(`listening on port ${process.env.PORT}`)
  );
};

const socket = new SocketServer(7071);

sequelize.sync({ force: false }).then(async () => {
  const fileTypes = await dbBulkCreate(FileType, [
    { name: "image" },
    { name: "video" },
  ] as FileType[]);
  const countries = await dbBulkCreate(Country, [
    { code: "SE" },
    { code: "US" },
  ] as Country[]);
  const countryArea = await dbBulkCreate(CountryArea, [
    { countryId: 1 },
    { countryId: 2 },
  ] as CountryArea[]);
  const languages = await dbBulkCreate(Language, [
    { name: "en" },
    { name: "se" },
  ]);

  const questionContent = await dbBulkCreate(
    QuestionContent,
    [
      {
        title: "What is your favourite movie?",
        coverImage: {
          url: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW92aWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
          name: "movie",
        } as File,
      },
      {
        title: "What is something you wish you said?",
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

  initApp();
  initCronJobs();
});
