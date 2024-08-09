const express = require("express");
const { PORT } = require("./config/serverConfig");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cityController = require("./controllers/city-Controller");

const createAndRunServer = async () => {
  app.use("/create", cityController.create);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

createAndRunServer();
