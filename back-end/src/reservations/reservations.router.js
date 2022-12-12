/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */
const MethodNotAllowed = require("../errors/MethodNotAllowed")
const router = require("express").Router();
const controller = require("./reservations.controller");

router.route("/new")
    .post(controller.create)

router.route("/")
    .get(controller.list);

module.exports = router;
