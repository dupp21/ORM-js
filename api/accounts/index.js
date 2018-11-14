const express = require("express");
const router = express.Router();
const controller = require("./controller");
const helpers = require("../helpers");

router.get("/", helpers.isAuthenticated, controller.getAll);
router.post("/", controller.post);
router.post("/login", controller.login);

module.exports = router;
