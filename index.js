require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models/models");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
const errorHandlerMiddleware = require("./middleware/ErrorHandlingMiddleware");
const path = require('path')

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")))
app.use(fileUpload({}));
app.use("/api", router);

//middleware который работает с ошибками должен регистрироваться в самом конце
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`SERVER RUN ON PORT ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
