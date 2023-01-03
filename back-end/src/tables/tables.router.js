/**
 * Defines the router for tables resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/:table_id/seat")
  .put(controller.put)
  .delete(controller.delete)
  .all(methodNotAllowed);

router
  .route("/")
  .post(controller.post)
  .get(controller.get)
  .all(methodNotAllowed);

module.exports = router;
