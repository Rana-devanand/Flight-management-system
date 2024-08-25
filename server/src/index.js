const express = require("express");
const { PORT } = require("./config/serverConfig");
const bodyParser = require("body-parser");
const cors = require("cors");
// const db = require("./models/index") 

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const DB_SYNC = process.env.DB_SYNC;
const apiRoutes = require("./routers/index");

const createAndRunServer = async () => {
  app.use("/api", apiRoutes);

  // if (DB_SYNC) {
  //   db.sequelize.sync({ alert: true });
  // }
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

createAndRunServer();
