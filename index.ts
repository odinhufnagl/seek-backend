require("dotenv").config();
import bodyParser from "body-parser";
import express from "express";
import * as admin from "firebase-admin";
import { FIRST_TIME_ZONE } from "./src/constants";
import { initCronJobs } from "./src/cronJobs";
import {
  Country,
  CountryArea,
  FileType,
  Language,
  NotificationToken,
  User,
  sequelize,
} from "./src/db/models/index";
import { errorHandler } from "./src/middleware";
import apiRoutes from "./src/routes/api/index";
import { dbBulkCreate, dbCreate } from "./src/services";
//import { initSocket } from "./src/socket";

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: `gs://${process.env.FIREBASE_STORAGE_BUCKET}/`,
});

const bucket = admin.storage().bucket();

export { bucket };

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

sequelize.sync({ force: true }).then(async () => {
  const fileTypes = await dbBulkCreate(FileType, [
    { name: "image" },
    { name: "video" },
  ] as FileType[]);
  const countries = await dbBulkCreate(Country, [
    { code: "SE-se" },
    { code: "US-us" },
  ] as Country[]);
  const countryArea = await dbBulkCreate(CountryArea, [
    { countryId: 1 },
    { countryId: 2 },
  ] as CountryArea[]);
  const languages = await dbBulkCreate(Language, [
    { name: "en" },
    { name: "se" },
  ]);
  const user = await dbCreate(
    User,
    {
      email: "odin.hufnagl@gmail.com",
      name: "Odin Hufnagl",
      password: "M1lan2012",
      timeZone: FIRST_TIME_ZONE,
      notificationTokens: [{ name: "huhuhu" }, { name: "huhu" }],
    } as User,
    { include: [{ model: NotificationToken }] }
  );
  const user2 = await dbCreate(User, {
    email: "odin.hufnffffagl@gmail.com",
    name: "Odin Hufnagl",
    password: "M1lan2012",
    timeZone: FIRST_TIME_ZONE,
  } as User);

  initApp();
  initCronJobs();
  // initSocket();
});
