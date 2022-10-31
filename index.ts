import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./src/db/models/index";

require("dotenv").config();
var app = express();
import routes from "./src/routes/index";
import { initSocket } from "./src/socket";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);

const initApp = (): void => {
  app.listen(process.env.PORT, function () {
    console.log(`listening on port ${process.env.PORT}`);
  });
};

sequelize.sync({ force: true }).then(async () => {
  initApp();
  initSocket();
});
