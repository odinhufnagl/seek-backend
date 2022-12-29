require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./src/db/models/index";
import * as admin from "firebase-admin";
import routes from "./src/routes/index";
import { initSocket } from "./src/socket";

const serviceAccount = require("./serviceAccountKey.json");

var app = express();

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);

const initApp = (): void => {
  app.listen(process.env.PORT, () =>
    console.log(`listening on port ${process.env.PORT}`)
  );
};

sequelize.sync({ force: true }).then(async () => {
  initApp();
  initSocket();
});
