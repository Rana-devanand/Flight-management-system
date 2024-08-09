const express = require("express");
const { PORT } = require("./config/serverConfig");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const apiRoutes = require("./routers/index");

const createAndRunServer = async () => {
  app.use("/api", apiRoutes);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

createAndRunServer();
