/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed")
const cors = require("cors")

router.use(cors());

// router.route("/new").get(controller.read).all(methodNotAllowed);
router.route("/").get(cors(), controller.list).all(methodNotAllowed);

module.exports = router;

