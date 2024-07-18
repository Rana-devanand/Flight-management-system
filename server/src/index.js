const express = require("express");
const { PORT } = require("./config/serverConfig");
const app = express();

const createAndRunServer = () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

createAndRunServer();
