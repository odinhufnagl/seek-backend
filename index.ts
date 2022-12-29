require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import { models, sequelize, Tag, WordVector } from "./src/db/models/index";
import routes from "./src/routes/index";

var app = express();

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
  // initSocket();
});
