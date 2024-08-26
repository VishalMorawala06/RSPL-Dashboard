const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//const morgan = require("morgan");
const sql = require("mssql");
const path = require("path");
require("dotenv").config();

// CORS

const cors = require("cors");
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  methods: "*",
};
app.use(cors(corsOptions));

//app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);
app.use(express.json()); // This parses incoming JSON request bodies
const rootRouter = require("./APIs/indexApi");
app.use(`/${process.env.SUB_DOMAIN}/api`, rootRouter);

//Cron Job
 //require('./utility/cron-job');

// FilePath
//app.use(express.static(path.join(__dirname, "../public")));

// API Error handler
app.use((req, res, next) => {
  // Redirect file path for development
  if (
    process.env.PROD === "false" &&
    req.originalUrl.toString()?.includes(`${process.env.SUB_DOMAIN}/public/`)
  ) {
    const newUrl = req.originalUrl.replace(`${process.env.SUB_DOMAIN}/public/`, "");
    res.redirect(301, newUrl);
    return;
  }
  res.status(500).json({
    message: `Sorry, API Not Found, try again. OriginalURL : ${req.originalUrl.toString()}`,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
