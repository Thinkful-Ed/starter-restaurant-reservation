/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */
const service = require("./reservations.service.js")
const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .get(controller.list)
  .post(controller.newRes)
  .all(methodNotAllowed);

router
  .route("/:reservation_id")
  .get(controller.getRes)
  .put(controller.update)
  //.delete(controller.delete)
  .all(methodNotAllowed);


module.exports = router;
