const { encrypt } = require("../middleware/encrypt-decrypt");

const CATCH_VALUE = {};

const catchResponse = (data, req, res, next) => {
  try {
    CATCH_VALUE[req.originalUrl] = data;
    next(data);
  } catch (error) {
    console.log(error.message);
  }
};

const checkCatch = (req, res, next) => {
  console.log("Checking Cache");
  try {
    if (CATCH_VALUE[req.originalUrl]) {
      encrypt(CATCH_VALUE[req.originalUrl], req, res, next);
      return;
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};

const deleteCatch = (URL) => {
  const catchKeys = Object.keys(CATCH_VALUE);
  const matchUrls = catchKeys?.filter((el) => el.includes(URL));
  if (!matchUrls.length) return;
  for (let i = 0; i < matchUrls.length; i++) {
    const url = matchUrls[i];
    if (CATCH_VALUE[url]) delete CATCH_VALUE[url];
  }
};

module.exports = { catchResponse, checkCatch, deleteCatch };
