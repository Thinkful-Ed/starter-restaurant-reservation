const router = require("express").Router()
const controller = require("./reservations.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")

/**
 * Defines the router for reservation resources
 *
 * @type {Router}
 */
router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed)

module.exports = router
