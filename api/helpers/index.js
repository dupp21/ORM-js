const jwt = require("jsonwebtoken");
const models = require("../models");

module.exports.isAuthenticated = (req, res, next) => {
  console.log("this is middleware");
  //1.Check Token
  const token =
    req.body.token ||
    req.query.token ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]) ||
    undefined;
  if (token === undefined) {
    return res.send("token not found");
  }
  //2.Decode Token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    models.accounts
      .findOne({ where: { id: decoded.id } })
      .then(accounts => {
        if (accounts === null) {
          return res.send("account not found");
        }
        req.decoded = decoded;
      })
      .catch(err => res.send);
  } catch (err) {
    res.send("token not valid");
  }

  next();
};
