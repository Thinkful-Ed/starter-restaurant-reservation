/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./reservations.controller");

router.route("/").get(controller.list).post(controller.post);

// router.route('/new').get(controller.list).all(controller.methodNotAllowed);

module.exports = router;
