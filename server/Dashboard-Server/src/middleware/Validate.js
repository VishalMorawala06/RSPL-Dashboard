const { toLowerCaseKeys } = require("./toLowerCaseKeys");

module.exports = {
  Get_Validator: (schema) => {
    return async (req, res, next) => {
      req.query = toLowerCaseKeys(req.query);
      const value = await schema.validate(req.query, { abortEarly: false });
      if (value.error) {
        res.status(400).send({
          message: value.error.details[0].message,
        });
      } else {
        req.query = value.value;
        next();
      }
    };
  },
  Post_Validator: (schema) => {
    return async (req, res, next) => {
      const value = await schema.validate(req.body, { abortEarly: false });
      if (value.error) {
        res.status(400).send({
          message: value.error.details[0].message,
        });
      } else {
        req.body = value.value;
        next();
      }
    };
  },
  Put_Validator: (schema) => {
    return async (req, res, next) => {
      const value = await schema.validate(req.body, { abortEarly: false });
      if (value.error) {
        res.status(400).send({
          message: value.error.details[0].message,
        });
      } else {
        req.body = value.value;
        next();
      }
    };
  },
  Delete_Validator: (schema) => {
    return async (req, res, next) => {
      req.query = toLowerCaseKeys(req.query);
      const value = await schema.validate(req.query, { abortEarly: false });
      if (value.error) {
        res.status(400).send({
          message: value.error.details[0].message,
        });
      } else {
        req.query = value.value;
        next();
      }
    };
  },
};
