import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./src/db/models/index";
require("dotenv").config();
var app = express();
import routes from "./src/routes/index";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);

sequelize.sync({ force: true }).then(async () => {
  app.listen(process.env.PORT, function () {
    console.log(`listening on port ${process.env.PORT}`);
  });
});
