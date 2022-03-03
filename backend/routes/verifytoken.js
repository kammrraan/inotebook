const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.token;
    const iat = jwt.verify(token, process.env.SECRET);
    console.log(iat);
    next();
  } catch (err) {
    res.send(err.message);
  }
};
