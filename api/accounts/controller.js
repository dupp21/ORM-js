const models = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getAll = (req, res) => {
  models.accounts
    .findAll()
    .then(accounts => res.send(accounts))
    .catch(err => res.send(err));
};

exports.login = (req, res) => {
  console.log(req.body);
  models.accounts
    .findOne({ where: { email: req.body.email } })
    .then(account => {
      if (account === null) {
        return res.send("account not found");
      }
      const validPassword = bcrypt.compareSync(
        req.body.password,
        account.password
      );
      if (validPassword === false) {
        return res.send("password not valid");
      }

      //Generation Token
      const tokenData = {
        payload: {
          name: account.name,
          id: account.id
        },
        secret: process.env.JWT_SECRET,
        options: {
          expiresIn: "7d"
        }
      };
      const token = jwt.sign(
        tokenData.payload,
        tokenData.secret,
        tokenData.options
      );
      res.send({ message: "You are Login", id: account.id, token: token });
    })
    .catch(err => console.log(err));
};

exports.post = (req, res) => {
  const SALT_WORK_FACTOR = 7;
  const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);

  req.body.password = bcrypt.hashSync(req.body.password, salt);

  models.accounts
    .create(req.body)
    .then(account =>
      res.send({ message: "insert data success", data: account })
    )

    .catch(err => res.send(err));
};
