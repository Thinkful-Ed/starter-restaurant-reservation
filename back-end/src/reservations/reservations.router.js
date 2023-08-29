/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
    .route("/:reservation_id/status")
    .put(controller.updateStatus) // Handle PUT request for updating reservation status
    .all(methodNotAllowed); // Respond with methodNotAllowed for unsupported methods

router
    .route("/:reservation_id")
    .get(controller.read) // Handle GET request for retrieving reservation details
    .put(controller.update) // Handle PUT request for updating reservation
    .all(methodNotAllowed); // Respond with methodNotAllowed for unsupported methods

router
    .route("/")
    .get(controller.list) // Handle GET request for listing reservations
    .post(controller.create) // Handle POST request for creating a new reservation
    .all(methodNotAllowed); // Respond with methodNotAllowed for unsupported methods

module.exports = router;





