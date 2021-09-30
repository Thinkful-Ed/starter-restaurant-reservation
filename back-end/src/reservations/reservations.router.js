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
  .create(controller.create)
  .all(methodNotAllowed);

router
  .route("/:reservation([0-9]+)")
  .get(controller.read)
  .update(controller.update)
  .delete(controller.destory)
  .all(methodNotAllowed)

module.exports = router;
