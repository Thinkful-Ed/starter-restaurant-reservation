/**
 * Defines the router for seat resources.
 *
 * @type {Router}
 */

const router = require("express").Router({mergeParams:true});
const tableController = require("../tables/tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").put(tableController.update).all(methodNotAllowed);

module.exports = router;
