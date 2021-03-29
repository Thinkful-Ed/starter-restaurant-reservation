const router = require("express").Router();
const controller = require("./tables.controller");

router.route("/").post(controller.create).get(controller.list).all();
router.route("/:table_id").get(controller.read).all();


module.exports = router;
