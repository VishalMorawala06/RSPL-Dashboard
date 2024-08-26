const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const token = req.headers["Authorization"] || req.headers["authorization"];
  if (!token) {
    return res.status(403).send({
      message: "A token is required for authentication",
    });
  }
  try {
    let NewToken = token.slice(7);
    const decoded = jwt.verify(NewToken, process.env.SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({
      message: "Invalid Token",
    });
  }
  return next();
};

module.exports = verifyToken;
