const express = require("express");
const rootRouter = express.Router();


const AccountApi = require("./Account");
const SystemSetupApi = require("./SystemSetup");

rootRouter.use("/account", AccountApi);
rootRouter.use("/systemsetup", SystemSetupApi);

module.exports = rootRouter;
