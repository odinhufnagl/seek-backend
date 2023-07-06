require("dotenv").config();
import bodyParser from "body-parser";
import express from "express";
import * as admin from "firebase-admin";
import {
  Chat,
  Country,
  CountryArea,
  FileType,
  Question,
  User,
  UserChat,
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
  const user = await dbCreate(User, {
    email: "odin.hufnagl@gmail.com",
    name: "Odin Hufnagl",
    password: "M1lan2012",
  } as User);
  const user2 = await dbCreate(User, {
    email: "odin.hufnffffagl@gmail.com",
    name: "Odin Hufnagl",
    password: "M1lan2012",
  } as User);
  const question = await dbCreate(Question, {
    title: "What is your favourite day?",
  } as Question);
  const chat = await dbCreate(Chat, { questionId: question.id } as Chat);
  const userChat = await dbCreate(UserChat, {
    userId: user.id,
    chatId: chat.id,
    isInformed: false,
  } as UserChat);
  const userChat2 = await dbCreate(UserChat, {
    userId: user2.id,
    chatId: chat.id,
    isInformed: true,
  } as UserChat);
  initApp();
  // initSocket();
});
