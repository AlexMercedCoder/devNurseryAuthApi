const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const payload = await jwt.verify(token, process.env.SECRET);
      req.payload = payload;
      next();
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = auth;
