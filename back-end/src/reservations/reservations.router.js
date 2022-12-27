/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router({mergeParams:true});
const controller = require("./reservations.controller");
//const cors = require("cors");
const methodNotAllowed = require("../errors/methodNotAllowed");
//Use CORS
//router.use(cors());

router.route("/").get(controller.list).all(methodNotAllowed);
//router.route("/:reservationId").get(controller.read).all(methodNotAllowed);
router.route("/:reservationId").get(controller.read).put(controller.update).all(methodNotAllowed);


router.route("/new").post(controller.create).all(methodNotAllowed);

module.exports = router;
