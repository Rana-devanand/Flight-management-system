const express = require("express");
const { PORT } = require("./config/serverConfig");
const bodyParser = require("body-parser");
const cors = require("cors");
// const db = require("./models/index") 
// const { user, roles } = require("./models/index")
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
  // const u1 = await user.findByPk(12)
  // const r1 = await roles.findByPk(3);
  // u1.addRole(r1);
  // const response = await r1.getUsers();
  // const checkRoles = await u1.hasRole(r1);
  // console.log(checkRoles);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

createAndRunServer();
