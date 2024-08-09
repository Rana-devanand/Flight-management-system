const express = require("express");
const router = express.Router();

const V1 = require("./V1/index");

router.use("/v1", V1);

module.exports = router;
