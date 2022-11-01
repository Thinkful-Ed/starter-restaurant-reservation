const router = require("express").Router();
const controller = require("./tables.controller");
const seatsRouter = require("../seats/seats.router");
const methodNotAllowed = require("../errors/methodNotAllowed");


router
    .use("/:table_id/seat", controller.tableExists, seatsRouter)

router
    .route("/:table_id")
    .get(controller.read)
    .all(methodNotAllowed);


router.route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);


module.exports = router;
