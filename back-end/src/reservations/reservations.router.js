/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .get(controller.list)
  .put(controller.create)
  .all(methodNotAllowed);

router
  .route("/:reservationId([0-9]+)")
  .get(controller.read)
  .post(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed)

module.exports = router;
