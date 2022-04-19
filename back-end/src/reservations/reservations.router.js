/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

//test connection

const router = require("express").Router();
const controller = require("./reservations.controller");

router.route("/").get(controller.list);

module.exports = router;
