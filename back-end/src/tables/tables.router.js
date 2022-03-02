/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed")
const cors = require("cors")

router.use(cors());

router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;
