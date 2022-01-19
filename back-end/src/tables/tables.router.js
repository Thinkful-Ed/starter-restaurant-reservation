const router = require("express").Router();
const controller = require ("./tables.controller")
const methodNotAllowed = require("../errors/methodNotAllowed");

router
    .route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);

router
    .route("/:table/seat")
    .put(controller.seat)
    .all(methodNotAllowed);

module.exports = router;