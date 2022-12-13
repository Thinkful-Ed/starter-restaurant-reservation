/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */
const MethodNotAllowed = require("../errors/MethodNotAllowed")
const router = require("express").Router();
const controller = require("./reservations.controller");


router.route("/")
    .get(controller.list)
    .post(controller.create)
    .all(MethodNotAllowed)
module.exports = router;
