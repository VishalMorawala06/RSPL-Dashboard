const CryptoJS = require("crypto-js");
const { toLowerCaseKeys } = require("./toLowerCaseKeys");

const Json_Formatter = {
  stringify: function (cipherParams) {
    var jsonObj = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) };
    if (cipherParams.iv) {
      jsonObj.iv = cipherParams.iv.toString();
    }
    if (cipherParams.salt) {
      jsonObj.s = cipherParams.salt.toString();
    }
    return JSON.stringify(jsonObj);
  },
  parse: function (jsonStr) {
    var jsonObj = JSON.parse(jsonStr);
    // extract ciphertext from json object, and create cipher params object
    var cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct),
    });
    if (jsonObj.iv) {
      cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv);
    }
    if (jsonObj.s) {
      cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s);
    }
    return cipherParams;
  },
};

module.exports.encrypt = function (data, req, res, next) {
  data = data instanceof String ? data : JSON.stringify(data);
  var encrypted = CryptoJS.AES.encrypt(data, process.env.SECRET_KEY, {
    format: Json_Formatter,
    mode: CryptoJS.mode.CBC,
  }).toString();
  res.status(200).json({
    result: JSON.parse(encrypted),
  });
};

module.exports.decrypt = function (req, res, next) {
  try {
    const key = process.env.SECRET_KEY; //SECRET KEY FOR ENCRYPTION
    let DValue = CryptoJS.AES.decrypt(JSON.stringify(req.body), key, { format: Json_Formatter }).toString(
      CryptoJS.enc.Utf8
    );
    req.body = toLowerCaseKeys(JSON.parse(JSON.parse(DValue)));
    next();
  } catch (error) {
    req.body = toLowerCaseKeys(req.body);
    next();
  }
};
