const router = require("express").Router();
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed")

router.route("/")
    .all(methodNotAllowed);

module.exports = router;