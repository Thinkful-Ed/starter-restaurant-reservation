/**
 * Defines the router for table resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
 const controller = require("./tables.controller");
 const methodNotAllowed = require("../errors/methodNotAllowed");

 module.exports = router;