/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./reservations.controller");

router
    .route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);

router 
    .route("/:reservation_id")
    .get(controller.read)
    .all(methodNotAllowed);

router
    .route("/:reservation_id/status")
    .put(controller.updateStatus)
    .all(methodNotAllowed);

module.exports = router;
